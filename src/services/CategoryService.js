import {API_CATEGORIES} from "../CommonData";
import FetchService from "./FetchService";

class CategoryService{
    getCategories(typeId){
        return  FetchService.handleFetch(API_CATEGORIES + "/" + typeId);
    }
}
export default new CategoryService();