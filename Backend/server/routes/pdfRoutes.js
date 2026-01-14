import express from "express";
import { downloadResumePDF } from "../controllers/pdfController.js";
import optionalAuth from "../middlewares/OptionalAuth.js";

const pdfRouter = express.Router();

// GET /pdf/resume/:slug
pdfRouter.get("/resume/:slug",optionalAuth, downloadResumePDF);

export default pdfRouter;
