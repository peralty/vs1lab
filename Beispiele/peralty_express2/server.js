var express = require("express");
var http = require("http");
var app = express();
var port = process.argv[2];
console.log("Server is now listening on port " + port);
http.createServer(app).listen(port);

app.use(express.static(__dirname + "/static"));

app.get("/", function(req, res) {
    res.send("Landing Page");
});

app.get("/greeting", function(req, res) {
    const url_parts = new URL(req.url, `http://${req.headers.host}`);
    const query = url_parts.searchParams;

    var name = query.has("name") ? query.get("name") : "Anonymus";
    res.send("Greeting " + name);
});

app.get("/cheerio", function(req, res) {
    res.send("See ya dude");
})