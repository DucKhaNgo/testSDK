var express = require('express');
var router = express.Router();
var sdk = require('sdk-abc-voice');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

const multer = require("multer");
var upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    cb(null, true);
  }
});
router.post("/uploadfile", upload.single("voice"), async (req, res, next) => {
  let wdRes = res;
  let wdReq = req;
  const file = req.file;
  if (
    file.mimetype !== "audio/wav" &&
    file.mimetype !== "audio/wave" &&
    file.mimetype !== "audio/x-wav"
  ) {
    wdReq.session.message = "Chỉ chấp nhận file .wav";
    wdRes.redirect("/demo");
    return;
  }
  if (!file) {
    wdReq.session.message = "Please upload a file";
    wdRes.redirect("/demo");
    return;
  }
  var formData = {
    voice: {
      value: file.buffer,
      options: {
        filename: file.originalname,
        contentType: file.mimetype
      }
    }
  };
  // Here is the way you use SDK to conver data
  // your API Key to verify with server
  var apiKey = req.body.apiKey;
  console.log('apikey------', apiKey);
  // Call API with apiKey and formdata
  console.log('formData------', formData);
  var result = sdk(apiKey, formData).then(data => { console.log('data: ', data);  return res.json(data)})
  .catch(err => console.log(err));
  //show result
  // console.log('result:   ', result);
  // res.json({ message: result });
})
module.exports = router;
