export type UserCredentials = {
    username: string,
    password: string,
}

export type UserFormInfo = UserCredentials & {
    confirmPassword: string,
}

export type UserState = {
    user: UserCredentials | null | undefined
    isError: boolean,
    isSuccess: boolean,
    isLoading: boolean,
    message: string
}