import {TYPES} from "../CommonData";

class TypeService {

    getTypes() {
        return fetch(TYPES).then(res => res.json());
    }
}
export default new TypeService();