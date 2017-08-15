// Installed express using node.js
var express = require('express');

// Makes setup more concise
var app = express();
var server = app.listen(3000);

app.use(express.static('webdir'));

console.log("Socket Server Running");

// Basically an import command
var socket = require('socket.io');

var io = socket(server);

io.sockets.on('connection', newConnection);

function newConnection(socket) {
	console.log('New Connection: ' + socket.id);
	//console.log(socket); // A lot of information written to console

	// Receives Data From Client
	socket.on('ball', ballMessage); 
	// Log and Emit data
	function ballMessage(data) {
		socket.broadcast.emit('ball', data);
		//console.log(data);
	}
	// trigger mouseMessage function from 'mouse'
	//function mouseMessage() { console.log(data); }
	// socket.broadcast.emit('mouse', data);
}