/*
Matthew Ngo
Air Hockey Server
*/


// Installed express using node.js
var express = require('express');

// Run Application Server on port 3000 with IP '0.0.0.0'
var app = express();
var server = app.listen(3000, '0.0.0.0', function() {
	console.log('Listening to port: ' + 3000);
});
app.use(express.static('webdir'));
console.log("Socket Server Running");

// Allows server to accept connections from client
var socket = require('socket.io');
var io = socket(server);
io.sockets.on('connection', newConnection);

// Gets new connection from client host 
function newConnection(socket) {
	console.log('New Connection: ' + socket.id);
	console.log(io.engine.clientsCount);
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