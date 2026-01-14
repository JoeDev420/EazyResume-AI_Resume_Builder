import express from "express"
import { getToken } from "../controllers/OauthController.js"


export const authRouter = express.Router()


authRouter.post("/getUserDetails",getToken)