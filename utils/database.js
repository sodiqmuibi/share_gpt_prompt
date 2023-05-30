import mongoose from "mongoose";

let isConnected = false

export const connectToDb = async () => {
    mongoose.set("strictQuery", true)
    if (isConnected) {
        console.log("Mongodb is already connected")
        return;
    }
    try {
        await mongoose.connect("mongodb://localhost:27017", {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        isConnected = true
        console.log("Mongodb connected")
    } catch (error) {
        console.log(error)
    }
}