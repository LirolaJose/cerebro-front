import {API_CATEGORIES} from "../CommonData";

class CategoryService{
    getCategories(typeId){
        return fetch(API_CATEGORIES + "/" + typeId).then(res => res.json());
    }
}
export default new CategoryService();