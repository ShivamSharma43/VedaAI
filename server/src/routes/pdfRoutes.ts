import { Router } from "express";
import { Assignment } from "../models/Assignment";
import { pdfQueue } from "../queues";
import { generatePdfBuffer } from "../services/pdfService";

const router = Router();

router.get("/:id/pdf", async (req, res, next) => {
  try {
    const doc = await Assignment.findById(req.params.id);
    if (!doc || !doc.generatedPaper)
      return res.status(404).json({ error: "No paper" });

    const buffer = await generatePdfBuffer(doc.toObject());
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${doc.title}.pdf"`
    );
    res.send(buffer);
  } catch (e) {
    next(e);
  }
});

export default router;