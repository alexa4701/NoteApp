import axios from 'axios'
const baseURL = "https://localhost:5001/api/NoteLists"

const get = (id) => {
    const request = axios.get(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const add = (notebookId, list) => {
    const request = axios.post(`${baseURL}/${notebookId}`, list)
    return request.then(response => response.data)
}

const edit = (id, notelist) => {
    const request = axios.put(`${baseURL}/${id}`, notelist)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { get, add, edit, remove }
