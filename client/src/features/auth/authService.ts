import axios from 'axios'
import { UserCredentials } from '../../types/User.types'
import { BackendError } from '@backend/app.types'

const API_URL = '/'
const authService = {
    register: async (userData: UserCredentials): Promise<string> => {
        return (await axios.post(API_URL, userData)).data
    },

    login: async (userData: UserCredentials): Promise<string | BackendError> => {
        return (await axios.post(API_URL + 'login', userData)).data
        // const errorMsg: string = res.data.message ?? ''
        // if (res.data && !errorMsg) {
        //     localStorage.setItem('user', res.data)
        // }
        // return { username: res.data, error: errorMsg }
    },

    logout: async (): Promise<void> => {
        await axios.post(API_URL + 'logout')
    }
}

export default authService