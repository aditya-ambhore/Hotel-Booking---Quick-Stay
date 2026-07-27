import multer from "multer";

// Store files in memory (good if you'll upload them to Cloudinary)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
});

export default upload;
