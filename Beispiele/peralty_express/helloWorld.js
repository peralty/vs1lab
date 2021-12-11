var express = require("express");
var http = require("http");
var app;

var port = process.argv[2];
console.log("Server is listening on port " + port);
app = express();
http.createServer(app).listen(port);

app.get("/greeting", function(req, res) {
    var url_parts = new URL(req.url, `http://${req.headers.host}`);
    var query = url_parts.searchParams;
    var name = query.has("name") ? query.get("name") : "Anonymus";
    res.send("Greetings " + name + " from the Server with Express!")
});

app.get("/goodbye", function(req, res) {
    res.send("Goodbye my friend!");
});