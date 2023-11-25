import { upldateDomList } from "src/Constant"
import { 
    GET_CATEGORIES, GET_CATEGORIES_FAIL, 
    GET_CATEGORIES_SUCCESS, SAVE_DATA, 
    SAVE_DATA_FAIL, SAVE_DATA_SUCCESS, SET_CATEGORY_DATA, TOGGLE_VIEW_MODAL } from "../Type"

const INITIAL = {
    saveData_loading: false,
    getCategories_loading: false,
    category_data: null,
    saved_data: null,
    viewModalOpen: false
}

export default (state = INITIAL, action) => {
    switch(action.type) {
        case SAVE_DATA: {
            return {
                ...state,
                saveData_loading: true,
            }
        }
        case SAVE_DATA_SUCCESS: {
            return {
                ...state,
                saveData_loading: false,
                saved_data: action.data,
                category_data: { ...state.category_data, categories: action.data.categories, name: action.data.name }
            }
        }
        case SAVE_DATA_FAIL: {
            return {
                ...state,
                saveData_loading: false
            }
        }
        case GET_CATEGORIES: {
            return {
                ...state,
                getCategories_loading: true,
            }
        }
        case GET_CATEGORIES_SUCCESS: {
            const newDomList = upldateDomList(action.data.category_dom, action.data.categories)
            return {
                ...state,
                getCategories_loading: false,
                category_data: { ...action.data, category_dom: newDomList }
            }
        }
        case GET_CATEGORIES_FAIL: {
            return {
                ...state,
                getCategories_loading: false,
            }
        }
        case SET_CATEGORY_DATA: {
            const { category_data } = action.data
            return {
                ...state,
                category_data: category_data
            }
        }
        case TOGGLE_VIEW_MODAL: {
            const { isOpen } = action.data
            return {
                ...state,
                viewModalOpen: isOpen
            }
        }
        default: 
            return state
    }
}