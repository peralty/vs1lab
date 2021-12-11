var http = require("http");
var server;

server = http.createServer(function(req, res) {     // callback Funktion; Event: Request von CLient geht ein 
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    res.end("Hello From Node Webserver!");
    console.log("HTTP Repsone sent");
});

server.listen(3000);
console.log("Server is listening on Port 3000");