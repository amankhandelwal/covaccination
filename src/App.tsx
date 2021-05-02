import React, {useEffect, useState} from 'react';
import logo from './assets/covid-vaccine.png';
import './App.css';
import {District, Session, State, States, VaccinationCenter, VaccinationCenters} from "./models";
import {getStates, getVaccinationForDistrictAndDate} from "./apis";
import moment from 'moment';

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


    /*useEffect(() => {
        getStates()
            .then(data => setStateList(data.states));
        getVaccinationForDistrictAndDate(district.district_id, date)
            .then(data => setVaccinationCenters(data.centers));
    }, []);*/

    return (
        <div className="App flexColumn">
            <header className={"flexRow"}>
                {/*<img src={logo} id="logo" alt="covid vaccine"/>*/}
                <div className={"flexColumn flexCenter"}>
                    <div>
                        <p id={"title"}>Find Covid Vaccines 💉</p>
                    </div>
                    <div>
                        <p id={"subtitle"}>Vaccines are safe. Please take the vaccines on time</p>
                    </div>
                </div>
            </header>
            <div className={"flexColumn list-container"}>
                {vaccinationCenters
                    .filter(item => item.sessions.some(it => it.available_capacity > 0))
                    .map(item => <VaccineCenterView {...item}/>)}
            </div>
        </div>
    );
}

const VaccineCenterView = ({name, block_name, pincode, fee_type, sessions}: VaccinationCenter,
                           under45Filter: boolean = true,
                           availabilityFilter: boolean = true) => (
    <div className={'vaccine-center flexColumn flexStart'}>
        <p>{name}</p>
        <p>{block_name}</p>
        <p>{pincode}</p>
        <p>{fee_type}</p>
        {sessions
            .filter(item => {
                if (availabilityFilter) {
                    return item.available_capacity > 0;
                } else {
                    return true;
                }
            })
            .filter(item => {
                if (under45Filter) {
                    return item.min_age_limit < 45;
                } else {
                    return true;
                }
            })
            .map(item => <VaccineCenterSession {...item} />)}
    </div>
);

const VaccineCenterSession = ({min_age_limit, available_capacity, slots, date}: Session) => (
    <div className="vaccine-session flexColumn flexStart">
        <p>{date}</p>
        <p>{min_age_limit}</p>
        <p>{available_capacity}</p>
        <div className={'flexRow'}>
            {slots.map(slot => <p>{slot}</p>)}
        </div>
    </div>
)


export default App;
