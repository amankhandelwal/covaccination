import React, {useEffect, useState} from 'react';
import './App.css';
import {District, Session, State, VaccinationCenter} from "./models";
import {
    getDistrictsForState,
    getStates,
    getVaccinationForDistrictAndDate,
    getVaccinationForPincodeAndDate
} from "./apis";
import moment from 'moment';
import {VaccineCenterView} from "./VaccineCenterView";

const useFilter = (
    defaultValue: boolean
): [boolean, React.Dispatch<React.SetStateAction<boolean>>, ((condition: boolean) => boolean)] => {
    const [enabled, setEnabled] = useState<boolean>(defaultValue);
    const checkConditionIfEnabled = (condition: boolean): boolean => {
        if (enabled) {
            return condition;
        } else {
            return true;
        }
    };
    return [enabled, setEnabled, checkConditionIfEnabled]
};

function App() {
    const dateformat = "DD-MM-YYYY";
    const [stateList, setStateList] = useState<State[]>([]);
    const [districtList, setDistrictList] = useState<District[]>([]);
    const [state, setState] = useState<State>(
        {state_id: '36', state_name: "West Bengal"}
    );
    const [district, setDistrict] = useState<District>(
        {district_id: '730', district_name: "North 24 Parganas"}
    );
    const [vaccinationCenters, setVaccinationCenters] = useState<VaccinationCenter[]>([]);
    const [date, setDate] = useState<string>(moment().format(dateformat));

    const [under45Filter, setunder45Filter, checkUnder45Filter] = useFilter(false);
    const [availabileFilter, setavailableFilter, checkAvailabilityFilter] = useFilter(true);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const district_id = urlParams.get('district_id');
        const pincode = urlParams.get('pincode');
        getStates()
            .then(data => setStateList(data.states));
        if (pincode != null) {
            getVaccinationForPincodeAndDate(pincode, date)
                .then(data => setVaccinationCenters(data.centers));
        }
        if (district_id != null) {
            getVaccinationForDistrictAndDate(district_id, date)
                .then(data => setVaccinationCenters(data.centers));
        }
    }, []);

    const onStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = stateList.find(item => item.state_id == event.target.value);
        if (selected != undefined && selected.state_id !== state.state_id) {
            setState(selected);
            getDistrictsForState(selected.state_id)
                .then(item => setDistrictList(item.districts));
        }
    };

    const onDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = districtList.find(item => item.district_id == event.target.value);
        if (selected !== undefined && selected.district_id !== district.district_id) {
            setDistrict(selected);
        }
    };

    const onSearch = async () => {
        if (district) {
            getVaccinationForDistrictAndDate(district.district_id, date)
                .then(data => setVaccinationCenters(data.centers));
        }
    };

    const filteredVaccineCenters = vaccinationCenters
        .filter(item => checkAvailabilityFilter(
            item.sessions.some(it => it.available_capacity > 0
            )))
        .filter(item => checkUnder45Filter(
            item.sessions.some(it => it.min_age_limit < 45
            )));

    return (
        <div className="App flexColumn">
            <header className={"flexRow"}>
                <div className={"flexColumn flexCenter"}>
                    <p id={"title"}>COVID VACCINES 💉</p>
                    <p id={"subtitle"}>Check your nearest vaccine centers and slot availability</p>
                </div>
            </header>
            <div className={'search'}>
                <div className={'select-container'}>
                    <label htmlFor="states">Select State:</label>
                    <select name={"states"} onChange={onStateChange}>
                        {stateList.map(item => <option value={item.state_id}>{item.state_name}</option>)}
                    </select>
                </div>
                <div className={'select-container'}>
                    <label htmlFor="districts">Select District:</label>
                    <select name={"districts"} onChange={onDistrictChange}>
                        {districtList.map(item => <option value={item.district_id}>{item.district_name}</option>)}
                    </select>
                </div>
                <button id={'searchButton'} onClick={onSearch}>Search</button>
            </div>
            <div className={'filters flexRow flex1'}>
                <button onClick={() => {
                    setavailableFilter(!availabileFilter)
                }}>
                    {availabileFilter ? "Show All Centers" : "Show Available Centers"}
                </button>
                <button onClick={() => {
                    setunder45Filter(!under45Filter)
                }}>
                    {under45Filter ? "18+ Age Group" : "All Age Group"}
                </button>
            </div>
            <div className={"flexColumn list-container"}>
                {filteredVaccineCenters.length > 0 ? (
                    filteredVaccineCenters
                        .map(item => <VaccineCenterView
                            vaccineCenter={item}
                            checkAvailabilityFilter={checkAvailabilityFilter}
                            checkUnder45Filter={checkUnder45Filter}/>)
                ) : (<div className={'error'}>No Results found</div>)}
            </div>
        </div>
    );
}

export default App;
