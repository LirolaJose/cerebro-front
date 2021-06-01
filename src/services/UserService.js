import {API_REGISTRATION} from "../CommonData";

class UserService{
    registerNewUser(userInfoDTO){
        fetch(API_REGISTRATION, {method: "POST",  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(userInfoDTO)})
            .then(result => {
                window.location.href = "/advertisement";
            });
    }
}
export default new UserService();