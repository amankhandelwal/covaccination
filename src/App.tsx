import React, {useEffect, useState} from 'react';
import './App.css';
import {District, Session, State, VaccinationCenter} from "./models";
import {getDistrictsForState, getStates, getVaccinationForDistrictAndDate} from "./apis";
import moment from 'moment';

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
        getStates()
            .then(data => setStateList(data.states));
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
        if (selected != undefined && selected.district_id !== district.district_id) {
            setDistrict(selected);
        }
    };

    const onSearch = () => {
        if (district) {
            getVaccinationForDistrictAndDate(district.district_id, date)
                .then(data => setVaccinationCenters(data.centers));
        }
    };

    return (
        <div className="App flexColumn">
            <header className={"flexRow"}>
                {/*<img src={logo} id="logo" alt="covid vaccine"/>*/}
                <div className={"flexColumn flexCenter"}>
                    <p id={"title"}>COVID VACCINES 💉</p>
                    <p id={"subtitle"}>Check your nearest vaccine centers and slot availability</p>
                </div>
            </header>
            <div className={'search flexColumn spaceAround'}>
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
                <button onClick={onSearch}>Search</button>
            </div>
            <div className={"flexColumn list-container"}>
                {vaccinationCenters
                    .filter(item => checkAvailabilityFilter(
                        item.sessions.some(it => it.available_capacity > 0
                        )))
                    .filter(item => checkUnder45Filter(
                        item.sessions.some(it => it.min_age_limit < 45
                        )))
                    .map(item => <VaccineCenterView
                        vaccineCenter={item}
                        checkAvailabilityFilter={checkAvailabilityFilter}
                        checkUnder45Filter={checkUnder45Filter}/>)}
            </div>
        </div>
    );
}

interface VaccineCenterViewProps {
    vaccineCenter: VaccinationCenter;
    checkUnder45Filter: (condition: boolean) => boolean;
    checkAvailabilityFilter: (condition: boolean) => boolean;

}

const VaccineCenterView = ({vaccineCenter, checkUnder45Filter, checkAvailabilityFilter}: VaccineCenterViewProps) => {
    const {name, block_name, pincode, fee_type, sessions} = vaccineCenter;
    return (
        <div className={'vaccine-center flexColumn flexStart'}>
            <p>{name}</p>
            <p>{block_name}</p>
            <p>{pincode}</p>
            <p>{fee_type}</p>
            {sessions
                .filter(item => checkAvailabilityFilter(item.available_capacity > 0))
                .filter(item => checkUnder45Filter(item.min_age_limit < 45))
                .map(item => <VaccineCenterSession {...item} />)}
        </div>
    );
}

const VaccineCenterSession = ({min_age_limit, available_capacity, slots, date}: Session) => {
    const isAvailableEmoji = available_capacity > 0 ? "✅" : "❌";
    const under45Allowed = min_age_limit < 45 ? "👦🏻" : "🧓🏼";
    return (
        <div className="vaccine-session flexColumn flexStart">
            <p>{date} {isAvailableEmoji} {under45Allowed}</p>
            <div className={'flexRow'}>
                {slots.map(slot => <p>{slot}</p>)}
            </div>
        </div>
    )
};


export default App;
