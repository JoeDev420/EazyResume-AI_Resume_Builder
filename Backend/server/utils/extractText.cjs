const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");




const normalizeText = (text) => {
  if (!text) return "";

  return text
    .replace(/\r/g, "\n")                // normalize line endings
    .replace(/\n{3,}/g, "\n\n")           // collapse huge gaps
    .replace(/[ \t]+/g, " ")              // collapse spaces
    .replace(/\u00A0/g, " ")              // non-breaking spaces
    .trim();
};


const extractTextFromFile = async (file) => {
  if (!file) throw new Error("No file provided");

  // ADD THIS LINE – get mimetype and buffer properly
  const { mimetype, buffer } = file;

  // PDF
  if (mimetype === "application/pdf") {
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();

    return {
      text: normalizeText(result.text),
      meta: {
        pages: result.numpages,
        source: "pdf"
      }
    };
  }

  // DOCX – fix: use the buffer we just destructured
  if (mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document") {
    const result = await mammoth.extractRawText({ buffer }); // ← was missing "file."

    return {
      text: normalizeText(result.value),
      meta: {
        source: "docx"
      }
    };
  }

  throw new Error(`Unsupported file type`);
};

module.exports = extractTextFromFile;