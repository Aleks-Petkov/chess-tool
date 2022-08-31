import axios from 'axios'
import { UserCredentials } from '../../types/User.types'

const API_URL = '/'
const authService = {
    register: async (userData: UserCredentials): Promise<string> => {
        return (await axios.post(API_URL, userData)).data
    },

    login: async (userData: UserCredentials): Promise<any> => {
        const res = await axios.post(API_URL + 'login', userData)
        const errorMsg: string = res.data.message ?? ''
        if (res.data && !errorMsg) {
            localStorage.setItem('user', res.data)
        }
        return { username: res.data, error: errorMsg }
    },

    logout: async () => {
        await axios.post(API_URL + 'logout')
        localStorage.removeItem('user')
    }
}

export default authService