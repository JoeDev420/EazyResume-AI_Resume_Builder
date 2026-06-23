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

const ALLOWED_ORIGINS = ["https://eazy-resume.vercel.app"]

const corsOptions = {
  origin: ALLOWED_ORIGINS,
  credentials: true
}

// CORS must be first — before body parsing — so error responses always carry the header
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

await connectDB()

app.use('/api/user', userRouter)
app.use('/api/resume', ResumeRouter)
app.use('/api/ai', aiRouter)
app.use('/api/Oauth', authRouter)
app.use("/api/pdf", pdfRouter)
app.use("/api/payment", PaymentRouter)

app.get('/', (_req, res) => {
  res.status(200).json({ status: "ok" })
})

// Global error handler — runs after all routes.
// Re-applies CORS headers so the browser never sees a headerless 500.
app.use((err, req, res, _next) => {
  const origin = req.headers.origin
  if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin)
    res.setHeader("Access-Control-Allow-Credentials", "true")
  }
  console.error("Unhandled error:", err.message)
  res.status(err.status || 500).json({ error: err.message || "Internal server error" })
})

app.listen(PORT, () => {
  console.log(`Server active on http://localhost:${PORT}`)
})
