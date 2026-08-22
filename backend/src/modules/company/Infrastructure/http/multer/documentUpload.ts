import multer from "multer";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "application/pdf",
  "image/jpeg",
  "image/png",
];

export const documentUpload = multer({
  storage,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (_req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PDF, JPG, JPEG, and PNG files are allowed"));
    }
  },
});

// നമ്മൾ ഇപ്പോൾ file memory-ൽ temporarily receive ചെയ്യാൻ configure ചെയ്യും.
//  S3-ലേക്ക് ഇപ്പോൾ save ചെയ്യില്ല.