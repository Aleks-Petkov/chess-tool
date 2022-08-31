import mongoose from 'mongoose'
import { OpeningDocument } from '../app.types'

const openingSchema = new mongoose.Schema<OpeningDocument>({
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