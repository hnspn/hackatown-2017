/*

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    document.getElementById("demo").innerHTML =
    this.responseText;
  }
};
xhttp.open("POST", "https://api-us.faceplusplus.com/facepp/v3/compare"
 + "api_key=Wvvsi7CNw0KHoerBv3LPkp9lRLvHVBuF"
 + "api_secret=4V4JRv0S8jSlajpTqAHHSLkYGfZeCOfW"
 + "image_url1=https://pbs.twimg.com/profile_images/883815283185659912/d1pAKv_Q.jpg"
 + "image_url2=https://avatars0.githubusercontent.com/u/26352187?s=460&v=4", true);
xhttp.send();

*/

// Grab elements, create settings, etc.
var video = document.getElementById('video');

// Get access to the camera!
if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    // Not adding `{ audio: true }` since we only want video now
    navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
        video.src = window.URL.createObjectURL(stream);
        video.play();
    });
}


// Legacy code below: getUserMedia 
else if(navigator.getUserMedia) { // Standard
    navigator.getUserMedia({ video: true }, function(stream) {
        video.src = stream;
        video.play();
    }, errBack);
} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed
    navigator.webkitGetUserMedia({ video: true }, function(stream){
        video.src = window.webkitURL.createObjectURL(stream);
        video.play();
    }, errBack);
} else if(navigator.mozGetUserMedia) { // Mozilla-prefixed
    navigator.mozGetUserMedia({ video: true }, function(stream){
        video.src = window.URL.createObjectURL(stream);
        video.play();
    }, errBack);
}

// Elements for taking the snapshot
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
var video = document.getElementById('video');

// Trigger photo take
document.getElementById("snap").addEventListener("click", function() {
    context.drawImage(video, 0, 0, 640, 480);

    bannerImage = document.getElementById('snap');
    imgData = getBase64Image(bannerImage);
    localStorage.setItem("imgData", imgData);

});

function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}