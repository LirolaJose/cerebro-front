import {API_ADVERTISEMENT, API_ORDER} from "../CommonData";
import FetchService from "./FetchService";

class OrderService {
    getAdvertisementById(advertisementId){
        return  FetchService.handleFetch(API_ADVERTISEMENT + "/" + advertisementId)
            .then(result => result.json());
    }

    createOrder(advertisementOrderDTO){
        FetchService.handleFetch(API_ORDER + "/",
            {method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(advertisementOrderDTO)})
            .then(result => {
                window.location.href = "/advertisement";
            });
    }
}
export default new OrderService();