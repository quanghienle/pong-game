//main program

const http = require('http').createServer(handler);
const io = require('socket.io')(http); //wrap server app in socket io capability
const fs = require('fs');
const url = require("url"); //to parse url strings
const PORT = process.env.PORT || 3000;
const ROOT_DIR = "html";
const INDEX_PATH = "/pingpong.html";

http.listen(PORT, '0.0.0.0'); //start server listening on PORT

const CUSTOMIZATION = require("./settings/Customization.js");

let playerQueue = new (require('./files/PlayerQueue.js'))(io);
let playerRoom = new (require('./files/PlayerRoom.js'))(io);
let controller = new (require('./files/Controller.js'))(io, playerRoom);

io.on('connection', function (socket) {
    console.log('user connected: ', socket.id);

    playerQueue.push(socket);
    playerQueue.dispatch(playerRoom);

    io.to(socket.id).emit('connected', CUSTOMIZATION);

    socket.on('disconnect', function () {
        let roomIndex = playerRoom.roomIndex[socket.id];
        if (roomIndex) {
            playerRoom.destroy(roomIndex, playerQueue);
        }
        playerQueue.kick(socket);
        playerQueue.dispatch(playerRoom);
        console.log('user disconnected: ', socket.id);
    });
    socket.on('keydown', function (keyCode) {
        let roomIndex = playerRoom.roomIndex[socket.id];
        if (roomIndex) {
            playerRoom.rooms[roomIndex].objects[socket.id].keypress[keyCode] = true;
        }
    });
    socket.on('keyup', function (keyCode) {
        let roomIndex = playerRoom.roomIndex[socket.id];
        if (roomIndex)
            delete playerRoom.rooms[roomIndex].objects[socket.id].keypress[keyCode];
    });
});
const MIME_TYPES = {
    css: "text/css",
    gif: "image/gif",
    htm: "text/html",
    html: "text/html",
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    js: "application/javascript",
    json: "application/json",
    png: "image/png",
    txt: "text/plain"
};

function getMimeType(filename) {
    for (let key in MIME_TYPES) {
        if (filename.indexOf(key, filename.length - key.length) !== -1) {
            return MIME_TYPES[key];
        }
    }
    return MIME_TYPES["txt"]
}

function handler(request, response) {
    let urlObj = url.parse(request.url, true, false);
    let filePath = (urlObj.pathname === "/" ? INDEX_PATH : urlObj.pathname);
    console.log("\n============================");
    console.log("REQUEST URL: " + urlObj.pathname);
    console.log("PATHNAME: " + ROOT_DIR + filePath);
    console.log("METHOD: " + request.method);

    let receivedData = "";

    //attached event handlers to collect the message data
    request.on("data", function (chunk) {
        receivedData += chunk;
    });

    //event handler for the end of the message
    request.on("end", function () {
        // console.log("REQUEST END: ");
        // console.log("received data: ", receivedData);
        console.log("type: ", typeof receivedData);

        // handle POST request
        //if (request.method == "POST") {}

        //handle static GET request for files
        if (request.method == "GET") {
            fs.readFile(ROOT_DIR + filePath, function (err, data) {
                if (err) {
                    console.log("ERROR: " + JSON.stringify(err));
                    response.writeHead(404);
                    response.end(JSON.stringify(err));
                    return;
                }
                response.writeHead(200, {"Content-Type": getMimeType(filePath)});
                response.end(data)
            })
        }
    })
}

console.log("Server Running at PORT 3000 CTRL-C to quit");
console.log("Open http://localhost:3000 to Start the Game");
