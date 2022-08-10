import mongoose from 'mongoose'

const openingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    fenPosition: {
        type: String,
        required: true,
        unique: true
    }
})

export default mongoose.model('Opening', openingSchema)