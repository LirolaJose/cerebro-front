import {API_IMAGE} from "../CommonData";
import FetchService from "./FetchService";

class ImageService {
    getImagesList(advertisementId) {
        return FetchService.handleFetch(API_IMAGE + "/imagesList/" + advertisementId);
    }
}

export default new ImageService();