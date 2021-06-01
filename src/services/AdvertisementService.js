import {API_ADVERTISEMENT} from "../CommonData";

class AdvertisementService {

    getAdvertisementsList() {
        return fetch(API_ADVERTISEMENT)
            .then(res => res.json());
    }

    getAdvertisementById(advertisementId) {
        return fetch(API_ADVERTISEMENT + "/" + advertisementId)
            .then(res => res.json());
    }

    createAdvertisement(advertisementDTO, images) {
        let data = new FormData();
        data.append("advertisementDTO", new Blob([JSON.stringify(advertisementDTO)], {type: "application/json"}));

        Object.keys(images).forEach(image => {
            data.append("images", images[image])
        })
        fetch(API_ADVERTISEMENT + "/", {method: "POST", body: data})
            .then(result => {
                window.location.href = "/advertisement";
            });


    }
}

export default new AdvertisementService()


