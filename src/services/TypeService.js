import {API_TYPES} from "../CommonData";

class TypeService {

    getTypes() {
        return fetch(API_TYPES).then(res => res.json());
    }
}
export default new TypeService();