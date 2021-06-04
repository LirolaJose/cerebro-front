import {API_ORDER} from "../CommonData";
import FetchService from "./FetchService";

class OrderService {
    createOrder(advertisementOrderDTO) {
        return FetchService.handleFetch(API_ORDER + "/",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(advertisementOrderDTO)
            });
    }
}

export default new OrderService();