import {API_ADVERTISEMENT, API_ORDER} from "../CommonData";

class OrderService {
    getAdvertisementById(advertisementId){
        return fetch(API_ADVERTISEMENT + "/" + advertisementId)
            .then(result => result.json());
    }

    createOrder(advertisementOrderDTO){
        fetch(API_ORDER + "/", {method: "POST",  headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(advertisementOrderDTO)})
            .then(result => {
                window.location.href = "/advertisement";
            });
    }
}
export default new OrderService();