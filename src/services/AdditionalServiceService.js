import {API_ADDITIONAL_SERVICES} from "../CommonData";
import FetchService from "./FetchService";

class AdditionalServiceService {

    getAdditionalServicesByAdvertisementId(advertisementId) {
        return FetchService.handleFetch(API_ADDITIONAL_SERVICES + "/advertisement/" + advertisementId);
    }

    getAdditionalServicesByCategoryId(categoryId) {
        return FetchService.handleFetch(API_ADDITIONAL_SERVICES + "/category/" + categoryId);
    }
}

export default new AdditionalServiceService();