const multer = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname.slice(0, 47) + 'uploads');
  },

  filename: function (req, file, cb) {
    file.originalname = Buffer.from(file.originalname, 'latin1').toString(
      'utf8'
    );

    cb(null, Date.now().toString() + '-' + file.originalname);
  },
});

module.exports = multer({
  storage: storage,

  limits: { fileSize: 5 * 1024 * 1024 },
});
