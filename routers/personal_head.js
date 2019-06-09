

const express = require('express');
const router = express.Router();
const multer = require('multer');
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './public/img/personal_center/uploads')
    },
    filename: function(req, file, cb) {
        cb(null,file.originalname)
    }
  });
  let upload = multer({
    storage: storage
  });

  router.post('/p_upload', upload.single('avator'),(req,res) => {
    res.send();
  });


module.exports = router;
