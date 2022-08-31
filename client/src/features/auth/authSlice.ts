import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { UserCredentials, UserState } from '../../types/User.types'
import { AxiosError } from 'axios';

const user = (localStorage.getItem('user') as string)

const initialState: UserState = {
    user: user ?? "",
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
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.message = action.payload as string
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.user = ""

            })
            .addCase(logout.fulfilled, (state) => {
                state.user = ""
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                console.log("Fulfilled", action.payload)
                state.user = action.payload
                state.isLoading = false
                state.isSuccess = true
                // if (typeof action.payload !== string)
                //  state.user = action.payload.user.username
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload as string
                state.user = ""
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
            const { username, error } = await authService.login(user)
            if (error)
                return thunkAPI.rejectWithValue(error)
            else
                return username
        } catch (error: any) {
            if (error instanceof AxiosError) {
                const message: string = error.response?.data?.message || error.message || error.toString()
                return thunkAPI.rejectWithValue(message)
            }
        }
    })

export const logout = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})



export const { reset } = authSlice.actions
export default authSlice.reducer