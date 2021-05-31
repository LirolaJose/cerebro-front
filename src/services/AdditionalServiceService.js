import {API_ADDITIONAL_SERVICES} from "../CommonData";

class AdditionalServiceService {

    getAdditionalServicesByAdvertisementId(advertisementId){
        return fetch(API_ADDITIONAL_SERVICES + "/advertisement/" + advertisementId)
            .then(res => res.json());
    }

    getAdditionalServicesByCategoryId(categoryId){
        return fetch(API_ADDITIONAL_SERVICES + "/category/" + categoryId)
            .then(res => res.json());
    }
}
export default new AdditionalServiceService();