
import { 
    getCategories as getCategoriesApi,
    saveData as saveDataApi
} from "src/Api";
import { GET_CATEGORIES, GET_CATEGORIES_FAIL, GET_CATEGORIES_SUCCESS, SAVE_DATA, SAVE_DATA_FAIL, SAVE_DATA_SUCCESS } from "../Type";

import { takeLatest, put } from 'redux-saga/effects';
import { toast } from "react-toastify";

function* getCategories() {
    try {
        const result = yield getCategoriesApi();
        if (result && result.data) {
          yield put({ type: GET_CATEGORIES_SUCCESS, data: result.data });
        } else {
          yield put({ type: GET_CATEGORIES_FAIL, data: null });
        }
      } catch (err) {
        alert(err);
      }
}

export function* watchGetCategories() {
    yield(takeLatest(GET_CATEGORIES, getCategories))
}

function* saveData(payload) {
    try {
        const result = yield saveDataApi(payload.data);
        console.log(result)
        if (result && result.data) {
          toast("Data updated successfully")
          yield put({ type: SAVE_DATA_SUCCESS, data: result.data });
        } else {
          toast("Sorry, we encountered an successfully")
          yield put({ type: SAVE_DATA_FAIL, data: null });
        }
      } catch (err) {
        alert(err);
      }
}

export function* watchSaveData() {
    yield(takeLatest(SAVE_DATA, saveData))
}