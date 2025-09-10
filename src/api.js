import axios from 'axios'

const API = axios.create({
    baseURL: 'http://127.0.0.1:5000',
    headers: {
        'Content-Type': 'application/json'
    }
})

export const addjobs = () => API.post('/user/teacher-positions')
export const getAlljobs = () => API.get('/user/teacher-positions')
export const addteacher = () => API.post('/user/teachers')
export const getAlluser = () => API.get('/user/teachers')