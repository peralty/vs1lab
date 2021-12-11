var http = require("http"),
    server;

var simpleHTTPResponder = function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/plain"
    });
    sentCounter++;
    res.end("Hello from Node Server 3 for the " + sentCounter + ". time!");
    console.log(sentCounter, " HTTP-Responses sent in total");
}

var sentCounter = 0;
server = http.createServer(simpleHTTPResponder);

var port = process.argv[2];
server.listen(port);
console.log("Server is listening on Port " + port);