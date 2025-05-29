import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Storage configuration
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

// File filter
function fileFilter(req, file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Images only!'), false);
  }
}

// Multer config (for multiple images)
const upload = multer({ storage, fileFilter });
const uploadMultipleImages = upload.array('images', 10); // max 10 files

// Route
router.post('/', (req, res) => {
  uploadMultipleImages(req, res, function (err) {
    if (err) {
      return res.status(400).send({ message: err.message });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).send({ message: 'No images uploaded' });
    }

    const uploadedImages = req.files.map((file) => `/${file.path}`);

    res.status(200).send({
      message: 'Images uploaded successfully',
      images: uploadedImages,
    });
  });
});

export default router;
