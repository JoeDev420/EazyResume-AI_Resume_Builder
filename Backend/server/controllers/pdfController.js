import Resume from "../models/Resume";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";



export const downloadResumePDF = async (req, res) => {
  try {
    const { slug } = req.params;
    const userId = req.userId || null;

    if (!slug) {
      return res.status(400).json({ success: false, message: "Missing slug" });
    }

    console.log("1. Looking for resume:", slug);
    const resume = await Resume.findOne({ slug });
    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found",
      });
    }

    console.log("2. Checking authorization");
    const isOwner = userId && resume.userId.toString() === userId;
    const isPublic = resume.public === true;

    if (!isPublic && !isOwner) {
      return res.status(403).json({
        success: false,
        message: "Not authorized to download this resume",
      });
    }

    console.log("3. Getting Chromium path");
    const executablePath = await chromium.executablePath();
    console.log("Chromium path:", executablePath);

    console.log("4. Launching browser");
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath,
      headless: chromium.headless,
    });

    const page = await browser.newPage();
    
    const url = `${process.env.FRONTEND_URL}/view/${slug}?print=true`;
    console.log("5. Navigating to:", url);

    await page.goto(url, { 
      waitUntil: "networkidle0",
      timeout: 30000 // 30 second timeout
    });

    console.log("6. Generating PDF");
    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    await browser.close();
    console.log("7. PDF generated successfully");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resume.title || slug}.pdf"`
    );

    return res.send(pdf);
  } catch (error) {
    console.error("PDF generation error:", error);
    return res.status(500).json({ 
      success: false, 
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};