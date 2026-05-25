import { Router } from "express";
import { Assignment } from "../models/Assignment";
import { generatePdfBuffer } from "../services/pdfService";

const router = Router();

router.get("/:id/pdf", async (req, res, next) => {
  try {
    const doc = await Assignment.findById(req.params.id);
    if (!doc || !doc.generatedPaper)
      return res.status(404).json({ error: "No paper" });

    // Use cached PDF if available; generate on-demand as fallback
    let buffer = doc.pdfBuffer;
    if (!buffer) {
      buffer = await generatePdfBuffer(doc.toObject());
    }

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${doc.title}.pdf"`
    );
    res.send(buffer);
  } catch (err) {
    next(err);
  }
});

export default router;