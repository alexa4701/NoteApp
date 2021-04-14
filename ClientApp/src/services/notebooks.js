import axios from 'axios'
const baseURL = "https://localhost:5001/api/NoteBooks"

const get = (id) => {
    const request = axios.get(`${baseURL}/${id}`)
    return request.then(response => response.data)
}

export default { get }
