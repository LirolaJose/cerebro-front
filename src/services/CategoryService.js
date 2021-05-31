import {CATEGORIES} from "../CommonData";

class CategoryService{
    getCategories(typeId){
        return fetch(CATEGORIES + "/" + typeId).then(res => res.json());
    }
}
export default new CategoryService();