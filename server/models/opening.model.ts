import mongoose from 'mongoose'

export interface IOpening extends mongoose.Document {
    name: string,
    fenPosition: string
}

export interface OpeningDocument extends IOpening, mongoose.Document {}

const openingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fenPosition: {
        type: String,
        required: false, // TODO: set true and look into validators
        unique: true
    }
})

export default mongoose.model<OpeningDocument>('Opening', openingSchema)