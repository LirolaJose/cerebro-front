import {API_ADVERTISEMENT} from "../CommonData";

class AdvertisementService{

     getAdvertisementsList(){
          return fetch(API_ADVERTISEMENT)
              .then(res => res.json());
     }

     getAdvertisementById(advertisementId) {
          return fetch(API_ADVERTISEMENT + "/" + advertisementId)
              .then(res => res.json());
     }
}

export default new AdvertisementService()


