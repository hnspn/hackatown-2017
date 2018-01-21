$(function () {
    var socket = io();
    socket.on('chat message', function (msg) {
        $('#messages').append($('<li>').text(msg));
        if (msg.startsWith('take photo')){
            key = msg.split(' ')[2];
            imgData = takePhoto();
            uploadPhoto(imgData, key);
        }
    });
});

function uploadPhoto(imgData, key) {
    const url = 'http://localhost:3000/api/upload';
    // $('#key').val(key);
    // $('#image').val(img);
    // $('form').submit();
    $.post(url, {
        key,
        imgData
    });
}