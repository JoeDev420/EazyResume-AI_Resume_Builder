import multer from "multer";
import path from "path"

// Remove diskStorage – use memoryStorage instead
const resumeUpload = multer({
  storage: multer.memoryStorage(),  // This adds file.buffer
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedMime = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    const allowedExt = [".pdf", ".docx"];
    const ext = path.extname(file.originalname).toLowerCase();

    cb(null, allowedMime.includes(file.mimetype) && allowedExt.includes(ext));
  },
});

export default resumeUpload;