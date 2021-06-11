import {any} from "prop-types";

class FetchService {

    handleFetch(url, settings = {headers: any}) {
        const token = localStorage.getItem("token");
        if (token !== null) {
            settings.headers = {
                ...settings.headers,
                Authorization: `Bearer ${token}`
            }
        }

        return fetch(url, settings).then(res => {
            if (res.ok) {
                return res;
            } else {
                res.json().then(err => alert(err.message));
                return Promise.reject(res)
            }
        });
    }
}

export default new FetchService();
