import express from "express"
import { createOrder, verifyPayment, claimBetaPremium } from "../controllers/paymentController.js"
import Userauth from "../middlewares/AuthenticateUser.js"

export const PaymentRouter = express.Router()

PaymentRouter.get("/create-order",Userauth,createOrder)

PaymentRouter.post("/payVerification",Userauth,verifyPayment)

PaymentRouter.post("/claim-beta",Userauth,claimBetaPremium)