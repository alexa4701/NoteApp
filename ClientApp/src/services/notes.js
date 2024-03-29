import axios from 'axios'
const baseURL = "https://localhost:5001/api/Notes"

const get = (id) => {
    const request = axios.get(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

const add = (listId, note) => {
    const request = axios.post(`${baseURL}/${listId}`, note)
    return request.then(response => response.data)
}

const edit = (id, note) => {
    const request = axios.put(`${baseURL}/${id}`, note)
    return request.then(response => response.data)
}

const toggleComplete = (id) => {
    const request = axios.put(`${baseURL}/${id}/ToggleNoteComplete`)
    return request.then(response => response.data)
}

const remove = (id) => {
    const request = axios.delete(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { get, add, edit, toggleComplete, remove }
