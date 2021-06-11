import {API_TYPES} from "../CommonData";
import FetchService from "./FetchService";

class TypeService {

    getTypes() {
        return FetchService.handleFetch(API_TYPES);
    }
}

export default new TypeService();