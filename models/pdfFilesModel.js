import mongoose from "mongoose";

const pdfFileSchema = new mongoose.Schema({
  filename: String,
  filePath: String,
  uploaderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor',
  },
  subjectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'subject',
  },
});

const pdfFile = mongoose.model('pdfFile', pdfFileSchema);

export default pdfFile;


