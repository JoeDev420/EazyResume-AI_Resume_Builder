import express from "express"
import { createOrder, verifyPayment } from "../controllers/paymentController.js"
import Userauth from "../middlewares/AuthenticateUser.js"

export const PaymentRouter = express.Router()

PaymentRouter.get("/create-order",Userauth,createOrder)

PaymentRouter.post("/payVerification",Userauth,verifyPayment)