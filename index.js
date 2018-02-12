var express = require('express')
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
   res.sendfile('./index.html');
});

app.use(express.static('public'))

io.on('connection', function(socket) {

    //for setting video
    socket.on('initVid', function(code){
         io.emit('initVid', code)
    });
    
    //play video
    socket.on('playVid', function(){
        io.emit('playVid')
    });

    //pause video
    socket.on('pauseVid', function(){
        io.emit('pauseVid')
    });

 });

http.listen(3000, function() {
   console.log('listening on *:3000');
});