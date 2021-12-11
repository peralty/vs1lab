var http = require("http");
var server;

var simpleHTTPResponder = function(req, res) {
    var url_parts = new URL(req.URL, `http://${req.headers.host}`);
    if (url_parts.pathname == "/greetme") {
        res.writeHead(200, {"Content-Type": "text/plain"});
        var query = url_parts.searchParams;
        if (query.has("name")) {
            res.end("Greetings " + query.get("name"));
        } else {
            res.end("Alright, keep your secrets");
        }
    } else {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.end("Try the path /greetme for a result");
    }
}

server = http.createServer(simpleHTTPResponder);
var port = process.argv[2];
server.listen(port);
console.log("Server is listening on port " + port);