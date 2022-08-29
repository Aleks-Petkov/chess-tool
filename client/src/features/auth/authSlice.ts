import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { UserCredentials, UserState } from '../../types/User.types'
import { AxiosError } from 'axios';

const user = JSON.parse(localStorage.getItem('user') as string)
console.log("User is ", user)

const initialState = {
    user: user ?? null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        }

    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.user = null

            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.user = null

            })
    }
})

export const register = createAsyncThunk('auth/register',
    async (user: UserCredentials, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message: string = error.response?.data?.message || error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
            }
        }
    })

export const login = createAsyncThunk('auth/login',
    async (user: UserCredentials, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message: string = error.response?.data?.message || error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
            }
        }
    })

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout() // TODO: compare w/ passport logout
})



export const { reset } = authSlice.actions
export default authSlice.reducer