export interface State {
    state_id: string;
    state_name: string;
}

export interface States {
    states: State[];
}

export interface District {
    district_id: string;
    district_name: string;
}

export interface Districts {
    districts: District[]
}

export interface Session {
    session_id: string;
    date: string;
    available_capacity: number;
    min_age_limit: number;
    vaccine: string;
    slots: string[];
}

export interface VaccinationCenter {
    center_id: number;
    name: string;
    state_name: string;
    district_name: string;
    block_name: string;
    pincode: number;
    lat: number;
    long: number;
    from: string;
    to: string;
    fee_type: string;
    sessions: Session[];
}

export interface VaccinationCenters {
    centers: VaccinationCenter[];
}
