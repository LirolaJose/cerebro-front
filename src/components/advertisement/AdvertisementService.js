export default function AdvertisementService() {
     return fetch("http://localhost:8080/api/advertisement")
        .then(res => res.json());
}
