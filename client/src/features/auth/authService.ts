import axios from 'axios'
import { UserCredentials } from '../../types/User.types'

const API_URL = '/'
const authService = {
    register: async (userData: UserCredentials): Promise<UserCredentials> => {
        const res = await axios.post(API_URL, userData)
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data
    },

    login: async (userData: UserCredentials): Promise<UserCredentials> => {
        const res = await axios.post(API_URL + 'login', userData)
        if (res.data) {
            localStorage.setItem('user', JSON.stringify(res.data))
        }
        return res.data
    },

    logout: async () => {
        await axios.post(API_URL + 'logout')
        localStorage.removeItem('user')
    }
}

export default authService