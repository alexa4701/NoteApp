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

export default { get, getAll }
