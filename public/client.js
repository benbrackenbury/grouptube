var socket = io();
var player;

var initVid = code => {
  socket.emit('initVid', code)
}

function LoadVideo(e) {
  document.getElementById('player').remove();
  var div = document.createElement("div");
  div.id = "player"
  document.body.appendChild(div);
  videoCode = document.getElementById('videoID').value
  initVid(videoCode)
}

function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING) {
    socket.emit('playVid')
  }
  if (event.data == YT.PlayerState.PAUSED) {
    socket.emit('pauseVid')
  }
}

socket.on('initVid', function(code){
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: code,
    events: {
      'onStateChange': onPlayerStateChange
    }
  });
});

socket.on('playVid', function(){
  player.playVideo()
});

socket.on('pauseVid', function(){
  player.pauseVideo()
});

function onPlayerReady(event) {
  event.target.playVideo();
}