import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI as string)
        console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline)
    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}