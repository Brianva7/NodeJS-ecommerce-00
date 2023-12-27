import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./src/public/uploads`);
  },

  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const originalname = file.originalname;
    cb(null, `${timestamp}-${originalname}`);
  },
});

export const uploader = multer({ storage });
