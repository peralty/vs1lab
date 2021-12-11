var http = require("http");
var server;
var sentCounter = 0;

server = http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Hello from Node Webserver 2!");
    sentCounter++;
    console.log(sentCounter + " HTTP Responses have been sent in total");
});

var port = 2345;
server.listen(port);
console.log("Server is listening on Port: " + port);