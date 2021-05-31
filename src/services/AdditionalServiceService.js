import {API_ADDITIONAL_SERVICES} from "../CommonData";

class AdditionalServiceService {

    getAdditionalServicesByAdvertisementId(advertisementId){
        return fetch(API_ADDITIONAL_SERVICES + "/advertisement/" + advertisementId)
            .then(res => res.json());
    }
}
export default new AdditionalServiceService();