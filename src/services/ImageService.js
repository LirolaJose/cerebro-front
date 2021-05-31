import {API_IMAGE} from "../CommonData";

class ImageService {
    getImagesList(advertisementId){
        return fetch(API_IMAGE + "/imagesList/" + advertisementId)
            .then(res => res.json());
    }
}
export default new ImageService();