import {API_TYPES} from "../CommonData";
import FetchService from "./FetchService";

class TypeService {

    getTypes() {
        return  FetchService.handleFetch(API_TYPES).then(res => res.json());
    }
}
export default new TypeService();