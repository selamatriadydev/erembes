import multer from "multer";
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, "/public/uploads"));
      },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
// const uploadImg = multer({storage: storage}).single('rembesfile');
const uploadImg = multer({storage: storage});

module.exports = {uploadImg:uploadImg};

