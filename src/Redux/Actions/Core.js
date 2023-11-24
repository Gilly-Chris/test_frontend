import { getCategories, saveData } from "src/Api";
import { 
    GET_CATEGORIES, 
    SAVE_DATA,
    SET_CATEGORY_DATA, 
} from "../Type";

export function getCategoriesAction() {
    return {
        type: GET_CATEGORIES,
        data: {}
    }
}

export function saveDataAction(data) {
    return {
        type: SAVE_DATA,
        data
    }
}

export function setCategoryData(category_data) {
    return {
        type: SET_CATEGORY_DATA,
        data: { category_data }
    }
}