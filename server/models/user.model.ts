import mongoose from 'mongoose'

export interface UserDocument extends mongoose.Document {
    username: string,
    password: string,
    opening: string // TODO: Make opening list
    // TODO: Perhaps move verify function here
    // comparePassword(candidatePassword: string): Promise<boolean>
}

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