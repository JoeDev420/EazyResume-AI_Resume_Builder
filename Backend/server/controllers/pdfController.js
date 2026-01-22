import Resume from "../models/Resume.js";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";



export const downloadResumePDF = async (req, res) => {


  try {
    const { slug } = req.params;
    const userId = req.userId || null; // may be undefined

    if (!slug) {
      return res.status(400).json({ success: false });
    }

    // 1️⃣ Fetch resume
    const resume = await Resume.findOne({ slug });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    // 2️⃣ Authorization check
    const isOwner = userId && resume.userId.toString() === userId;
    const isPublic = resume.public === true;

    if (!isPublic && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to download this resume",
      });
    }

    // 3️⃣ Generate PDF
    const browser = await puppeteer.launch({
  args: chromium.args,
  defaultViewport: chromium.defaultViewport,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
});


    const page = await browser.newPage();

    await page.goto(
      `${process.env.FRONTEND_URL}/view/${slug}?print=true`,
      { waitUntil: "networkidle0" }
    );

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    // 4️⃣ Respond
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resume.title || slug}.pdf"`
    );

    return res.send(pdf);
  } catch (error) {
    console.error("PDF error:", error.message);
    return res.status(500).json({ success: false });
  }
};
