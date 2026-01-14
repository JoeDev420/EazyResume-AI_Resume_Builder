import mongoose from "mongoose";


const connectDB = async () => {

    try {

        const mongodbURI = process.env.MONGODB_URI

        let projectName = "EazyResumeDB"  
        
        if(!mongodbURI){

            throw new Error("URI not set");

        }

        await mongoose.connect(`${mongodbURI}/${projectName}`)

        console.log("Database Connected")

        
    } catch (error) {

        console.log(error)
        
    }
    
}

export default connectDB