import axios from 'axios'
const baseURL = "https://localhost:5001/api/NoteBooks"


const get = (id) => {
    const request = axios.get(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const getAll = () => {
    const request = axios.get(`${baseURL}`)
    return request.then(response => response.data)
}

const add = (notebook) => {
    const request = axios.post(`${baseURL}`, notebook)
    return request.then(response => response.data)
}

const edit = (id, notebook) => {
    const request = axios.put(`${baseURL}/${id}`, notebook)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { get, getAll, add, edit, remove }
