import mongoose from "mongoose"

export const connectDb = () => {
    console.log(process.env.MONGO_URI);
    try {
        const db = mongoose.connect(process.env.MONGO_URI)
        console.log('dbconnected')
    } catch (error) {
        console.log(error)
    }
}