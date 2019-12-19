var express = require('express');
var router = express.Router();
var sdk = require('sdk-abc-voice');
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post("/uploadfile", upload.single("myFile"), async (req, res, next) => {
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
  var apikey = 'testExample';
  // Call API with apiKey and formdata
  var result = await sdk.convertAudio(apikey, formData);
  //show result
  console.log('result:   ', result);
})
module.exports = router;
