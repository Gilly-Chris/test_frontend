import { getCategories, saveData } from "src/Api";
import { 
    GET_CATEGORIES, 
    SAVE_DATA,
    SET_CATEGORY_DATA,
    TOGGLE_VIEW_MODAL, 
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

export function toggleViewModal(isOpen) {
    return {
        type: TOGGLE_VIEW_MODAL,
        data: { isOpen }
    }
}