import React from 'react';
import {Session, VaccinationCenter} from "./models";

export interface VaccineCenterViewProps {
    vaccineCenter: VaccinationCenter;
    checkUnder45Filter: (condition: boolean) => boolean;
    checkAvailabilityFilter: (condition: boolean) => boolean;

}

export const VaccineCenterView = ({vaccineCenter, checkUnder45Filter, checkAvailabilityFilter}: VaccineCenterViewProps) => {
    const {name, block_name, pincode, fee_type, sessions} = vaccineCenter;
    const filteredSessions = sessions
        .filter(item => checkAvailabilityFilter(item.available_capacity > 0))
        .filter(item => checkUnder45Filter(item.min_age_limit < 45))
    return (
        <div className={'flexColumn flexStart vaccine-center'}>
            <div className={'flexRow spaceBetween flex1'} style={{width: '100%'}}>
                <p style={{fontSize: 16, fontWeight: 'bold'}}>{name}</p>
                <p style={{fontSize: 16, fontWeight: 'bold', color: 'red'}}>{fee_type}</p>
            </div>
            <p style={{fontSize: 12, color: '#2F2F2F'}}>{block_name} ( {pincode} )</p>
            {filteredSessions.map(item => <VaccineCenterSession {...item} />)}
        </div>
    );
};

const VaccineCenterSession = ({min_age_limit, available_capacity, slots, date}: Session) => {
    const isAvailableEmoji = available_capacity > 0 ?
        <p className={'availableSlot'}>{`${available_capacity} Slots ✅`}</p>
        : <p className={'notAvailableSlot'}>{"Not Available ❌"}</p>;

    const under45Allowed = min_age_limit < 45 ? "👦🏻" : "🧓🏼";
    return (
        <div className="vaccine-session flexColumn flexStart">
            <div className={'flexRow spaceBetween flex1'} style={{width: '100%'}}>
                <p style={{fontSize: 12, fontWeight: 'bold'}}>{date} {under45Allowed}</p>
                {isAvailableEmoji}
            </div>
            <div className={'flexRow vaccine-slot'}>
                {slots.map(slot => <p className={'slotTime'}>{slot}</p>)}
            </div>
        </div>
    )
};
