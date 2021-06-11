import FetchService from "./FetchService";
import {API_USER} from "../CommonData";


export const TopUpBalance = (props) => {
    const money = {
        value: props.money
    }
    return FetchService.handleFetch(API_USER + "/" + props.userId + "/money/",
        {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(money)})
}