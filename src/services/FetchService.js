import {any} from "prop-types";

class FetchService {

    handleFetch(url, settings = {headers: any}) {
        const token = localStorage.getItem("token");
        if(token !== null) {
            settings.headers = {
                ...settings.headers,
                Authorization: `Bearer ${token}`
            }
        }

       return fetch(url, settings);
    }
}

export default new FetchService();
