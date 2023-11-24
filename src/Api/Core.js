import { Api } from "./Api"

export function* getCategories() {
    const jsonData = yield Api.get("/categories")
    return jsonData
}

export function* saveData(data) {
    const { name, categories, terms } = data
    const jsonData = yield Api.post(`/save?name=${name}&categories=${categories}&accepted_terms=${terms}`, data)
    return jsonData
}