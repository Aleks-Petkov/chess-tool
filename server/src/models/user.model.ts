import mongoose from 'mongoose'
import { UserDocument } from '../app.types'
//interface UserModel extends mongoose.Model<UserDocument> {};

const userSchema = new mongoose.Schema<UserDocument/*, UserModel*/>({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    opening: {
        type: String,
        required: false
    }
    // openings: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Opening"
    // }]
})

//export default mongoose.model<UserDocument, UserModel>('User', userSchema)
export default mongoose.model<UserDocument>('User', userSchema)