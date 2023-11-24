import { all, fork } from 'redux-saga/effects';
import { watchGetCategories, watchSaveData } from './Core';

export default function* rootSaga() {
    yield all([
        fork(watchGetCategories),
        fork(watchSaveData)
    ])
}