const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('file', file);
    // cb(null, +'uploads/');
    cb(null, __dirname.slice(0, 53) + 'public/image');
  },

  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8'
    );
    console.log('file:::', file);
    cb(null, file.originalname + '-' + Date.now().toString());
  },
});

module.exports = multer({
  storage: storage,

  limits: { fileSize: 5 * 1024 * 1024 },
});
