import {API_ADDITIONAL_SERVICES} from "../CommonData";
import FetchService from "./FetchService";

class AdditionalServiceService {

    getAdditionalServicesByAdvertisementId(advertisementId){
        return FetchService.handleFetch(API_ADDITIONAL_SERVICES + "/advertisement/" + advertisementId)
            .then(res => res.json());
    }

    getAdditionalServicesByCategoryId(categoryId){
        return FetchService.handleFetch(API_ADDITIONAL_SERVICES + "/category/" + categoryId)
            .then(res => res.json());
    }
}
export default new AdditionalServiceService();