const multer = require("multer");
const path = require("path");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log(req.originalUrl);
    if (req.originalUrl.includes("users")) {
      cb(null, "./public/avatar");
    } else {
      cb(null, "./public/events_images");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// filefilterFunction
function fileFilterFunction(req, file, cb) {
  const extension = path.extname(file.originalname);
  const allowedExtensions = [".png", ".jpg", ".jpeg"];
  if (allowedExtensions.includes(extension)) {
    cb(null, true);
  } else {
    cb(new Error("max files"), false);
  }
}
//maxSize allowed (1MB)
const maxSize = 1 * 1024 * 1024;
//upload function
const upload = multer({
  storage: fileStorageEngine,
  limits: { fileSize: maxSize, files: 3 },
  fileFilter: fileFilterFunction,
});

module.exports = upload;
