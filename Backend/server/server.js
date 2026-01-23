import express from "express"
import cors from "cors"
import "dotenv/config" 
import connectDB from "./config/db.js"
import userRouter from "./routes/userRoutes.js"
import ResumeRouter from "./routes/resumeRoutes.js"
import cookieParser from "cookie-parser"
import aiRouter from "./routes/aiRoutes.js"
import pdfRouter from "./routes/pdfRoutes.js"
import { authRouter } from "./routes/authRoutes.js"
import { PaymentRouter } from "./routes/payRoutes.js"


const app = express()

const PORT = process.env.PORT || 3000 

app.use(express.json()) 

app.use(cors({
  origin: ["https://eazy-resume.vercel.app",
],
  credentials: true
}))

app.use(cookieParser());

await connectDB();

app.use('/api/user',userRouter)
app.use('/api/resume',ResumeRouter)
app.use('/api/ai',aiRouter)
app.use('/api/Oauth',authRouter)
app.use("/api/pdf", pdfRouter);
app.use("/api/payment", PaymentRouter);

app.get('/',(req,res)=>{

    res.status(200).json({ status: "ok" });


})

app.listen(PORT,()=>{

            console.log(`Server active on http://localhost:${PORT}`)

})