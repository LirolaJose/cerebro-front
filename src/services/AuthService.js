import {API_CURRENT_USER, API_REGISTRATION, LOGIN, LOGOUT} from "../CommonData";
import FetchService from "./FetchService"
import Redirect from "../components/route/RedirectTo";

class AuthService {
    loginUser(credentials) {
        return FetchService.handleFetch(LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        });
    }

    logoutUser() {
        return FetchService.handleFetch(LOGOUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(localStorage.getItem("token"))
        })
            .then(result => {
                    localStorage.removeItem("token");
                    Redirect.redirectToHome();
                }
            )
    }

    registerNewUser(userInfoDTO) {
        return FetchService.handleFetch(API_REGISTRATION, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(userInfoDTO)
        });
    }

    getCurrentUser() {
        return FetchService.handleFetch(API_CURRENT_USER + "/", {method: "GET"});
    }
}

export default new AuthService();