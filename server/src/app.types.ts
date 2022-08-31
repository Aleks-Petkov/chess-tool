import mongoose from "mongoose";

export type BackendError = {
    error: string,
    stack: string | undefined
}

export interface OpeningDocument extends mongoose.Document {
    name: string,
    fenPosition: string
}

export interface UserDocument extends mongoose.Document {
    username: string,
    password: string,
    opening: string // TODO: Make opening list
}
