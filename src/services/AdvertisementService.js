import {API_ADVERTISEMENT} from "../CommonData";
import FetchService from "./FetchService";

class AdvertisementService {

    getAdvertisementsList() {
        return FetchService.handleFetch(API_ADVERTISEMENT);
    }

    getAdvertisementById(advertisementId) {
        return FetchService.handleFetch(API_ADVERTISEMENT + "/" + advertisementId);
    }

    createAdvertisement(advertisementDTO, images) {
        let data = new FormData();
        data.append("advertisementDTO", new Blob([JSON.stringify(advertisementDTO)], {type: "application/json"}));

        Object.keys(images).forEach(image => {
            data.append("images", images[image])
        })
        return FetchService.handleFetch(API_ADVERTISEMENT + "/", {method: "POST", body: data})
    }
}

export default new AdvertisementService()


