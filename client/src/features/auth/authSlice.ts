import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authService from './authService'
import { UserCredentials, UserState } from '../../types/User.types'
import { AxiosError } from 'axios';
import { BackendError } from '@backend/app.types'


const initialState: UserState = {
    user: localStorage.getItem('user'),
    status: 'idle',
    error: null
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.status = 'idle'
            state.error = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(register.fulfilled, (state, action) => {
                state.status = 'success'
                state.error = action.payload as string // TODO: check if line is needed
            })
            .addCase(register.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
            .addCase(login.pending, (state) => {
                state.status = 'pending'
            })
            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload as string
                state.status = 'success'
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.payload as string
            })
            .addCase(checkAuthenticated.pending, (state) => {
                //state.status = 'pending'
            })
            .addCase(checkAuthenticated.fulfilled, (state, action) => {
                state.user = action.payload?.user
                state.status = 'idle'
            })
    }
})

export const checkAuthenticated = createAsyncThunk('auth/checkAuthenticated', async () => {
    return await authService.checkAuthenticated()
})

export const register = createAsyncThunk('auth/register',
    async (user: UserCredentials, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (err: any) {
            if (err instanceof AxiosError) {
                const message: string = err.response?.data?.message || err.message
                return thunkAPI.rejectWithValue(message)
            }
        }
    })

export const login = createAsyncThunk('auth/login',
    async (user: UserCredentials, thunkAPI) => {
        try {
            const res: string | BackendError = await authService.login(user)
            if (typeof res === "string") {
                localStorage.setItem('user', res)
                return res
            }
            return thunkAPI.rejectWithValue(res.message)
        } catch (err: any) {
            if (err instanceof AxiosError) {
                const message: string = err.response?.data?.message || err.message
                return thunkAPI.rejectWithValue(message)
            }
        }
    })

export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('user')
    await authService.logout()
})

export const { reset } = authSlice.actions
export default authSlice.reducer