var express = require('express');
var router = express.Router();
const http = require('https')
const axios = require('axios');

const base_url = 'https://api-us.faceplusplus.com/facepp/v3/compare';
const key = 'RWUpRf_gxH6wLEawAfExUMKqzZqoIkFG';
const secret = '4nVF7_oQRH8LpUMG7pMOVi8Mt4PsnGq1';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is the api');
});

router.post('/upload', function(req, res) {
  console.log('UPLOADING');
  const key = req.body.key;
  const img1 = req.body.imgData;
  const img2 = 'http://localhost:3000/data/' + key + '.jpg';

  compare(img1, img2);

  res.redirect('/');
})

router.get('/:key', function(req, res, next) {
  req.app.get('io').emit('chat message', 'take photo ' + req.params.key);
  res.send(req.params)
});

function compare (img1, img2){
  console.log('COMPARING');
  request_options = {
    api_key: key,
    api_secret: secret,
    image_file1: img1,
    image_url2: img2
  };

  axios.post(base_url, request_options)
    .then((response) => {
      console.log('confidence:', res.confidence);
    })
    .catch((error) => {
      console.error(error);
    });
}

module.exports = router;
