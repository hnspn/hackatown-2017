var express = require('express');
var router = express.Router();
const http = require('https')
const axios = require('axios');
const jquery = require('jquery');

const url = 'https://api-us.faceplusplus.com/facepp/v3/compare';
const key = 'Wvvsi7CNw0KHoerBv3LPkp9lRLvHVBuF';
const secret = '4V4JRv0S8jSlajpTqAHHSLkYGfZeCOfW';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the api');
});

router.post('/upload', function(req, res) {
  console.log('UPLOADING');
  const key = req.body.key;
  const img1 = req.body.imgData;
  const img2 = 'http://localhost:3000/data/' + key + '.jpg';

  compare(img1, img2, req);

  res.redirect('/');
})

router.get('/:key', function(req, res, next) {
  req.app.get('io').emit('chat message', 'take photo ' + req.params.key);
  res.send(req.params)
});

function compare (img1, img2, req){
  console.log('COMPARING');
  data = {
    api_key: "Wvvsi7CNw0KHoerBv3LPkp9lRLvHVBuF",
    api_secret: "4V4JRv0S8jSlajpTqAHHSLkYGfZeCOfW",
    image_base64_1: img1,
    image_url2: img2
  };
  const confidence = .5;
  const percentage = confidence * 100;
  const message = 'the confidance level is ' + percentage+ '%';
  // req.app.get('io').emmit('chat messages', message)

  axios.post(url, data)
    .then((response) => {
      console.log('confidence:', response.confidence);
      if (response.confidence > .50) {
        
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = router;
