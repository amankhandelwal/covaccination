import {District, Districts, State, States, VaccinationCenters} from "./models";

interface KeyValueString {
    [k: string]: string;
}

function getRequest<T>(path: string, data?: KeyValueString): Promise<T> {
    let pathWithParams = path;
    if (data !== undefined) {
        const params = Object.keys(data).map(function (k) {
            return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
        }).join('&');
        pathWithParams = `${path}?${params}`;
    }
    return fetch(pathWithParams)
        .then(response => response.json() as unknown as T);
}

/**
 https://cdn-api.co-vin.in/api/v2/admin/location/states - Fetch States

 https://cdn-api.co-vin.in/api/v2/admin/location/districts/36 - Fetch Districts

 https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByDistrict?district_id=730&date=02-05-2021 - fetch vaccination info

 https://cdn-api.co-vin.in/api/v2/appointment/sessions/calendarByPin?pincode=700136&date=02-05-2021 - by pincode

 */

export const getStates = () => getRequest<States>("https://cdn-api.co-vin.in/api/v2/admin/location/states");

export const getDistrictsForState = (state_id: string) => getRequest<Districts>(
    `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${state_id}`
);

export const getVaccinationForDistrictAndDate = (district_id: string, date: string) => getRequest<VaccinationCenters>(
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict",
    {
        district_id,
        date
    }
);

export const getVaccinationForPincodeAndDate = (pincode: string, date: string) => getRequest<VaccinationCenters>(
    "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin",
    {
        pincode,
        date
    }
);
