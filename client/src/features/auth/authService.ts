import axios from 'axios'
import { UserCredentials, Username } from '../../types/User.types'
import { BackendError } from '@backend/app.types'

const API_URL = '/'
const authService = {
    register: async (userData: UserCredentials): Promise<string | BackendError> => {
        return (await axios.post(API_URL, userData)).data
    },

    login: async (userData: UserCredentials): Promise<Username | BackendError> => {
        return (await axios.post(API_URL + 'login', userData)).data
    },

    logout: async (): Promise<void> => {
        await axios.post(API_URL + 'logout')
    },

    checkAuthenticated: async (): Promise<Username> => {
        return (await axios.get('/auth')).data
    }
}

export default authService