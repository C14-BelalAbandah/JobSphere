const path = require("path");
const multer = require("multer");

const cvStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../images"));
  },
  filename: (req, file, cb) => {
    if (file) {
      cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
    } else {
      cb(null, false);
    }
  },
});

const cvUploadMiddleWare = multer({
  storage: cvStorage,
  fileFilter: (req,file,cb)=>{
    if (file.mimetype==="application/pdf"){
        cb(null,true)
    }else {
        cb({
            message:"Unsupported file format — only PDFs allowed"
        },false)
    }
  },
  limits: {fileSize: 1024*1024 *5}
});

module.exports= cvUploadMiddleWare
