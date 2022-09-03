import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserState } from '../types/User.types'
import { checkAuthenticated } from '../features/auth/authSlice'
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useProtectedPage = (isProtected: boolean): void => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state: { auth: UserState }) => state.auth)
    useEffect(() => {
        dispatch(checkAuthenticated())
    }, [dispatch])
    useEffect(() => {
        if (user !== localStorage.getItem('user')) {
            localStorage.removeItem('user')
            navigate('/')
        } else if (isProtected && !user) {
            navigate('/')
        } else if (!isProtected && user) {
            navigate('/dashboard')
        }

    }, [user, isProtected, navigate])

}

export const useProtectedPageoO = (isProtected: boolean) => {
    //useCheckAuth()
    const navigate = useNavigate()
    const { user } = useAppSelector((state: { auth: UserState }) => state.auth)
    useEffect(() => {
        if (isProtected && !user) {
            console.log("PROTECTEEED")
            navigate('/')
        } else if (!isProtected && user) {
            console.log("NOT PROTECTEEED")
            navigate('/dashboard')
        }
    }, [isProtected, user, navigate])
}