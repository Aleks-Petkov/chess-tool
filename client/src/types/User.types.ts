export type UserCredentials = {
    username: string,
    password: string,
}

export type UserFormInfo = UserCredentials & {
    confirmPassword: string,
}

export type UserState = {
    user: string | null,
    status: 'idle' | 'success' | 'pending' | 'fail'
    error: string | null
}