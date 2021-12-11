"use strict";
const fs = require('fs'),
    net = require('net'),
    filename = 'Beispiele/peralty_networking/changeFile.txt',
    // Server Event handling
    server = net.createServer(function(connection) {   // callback Funktion. Event: Client verbindet sich mit Server
        console.log("Subscriber connected");
        connection.write("Now watching " + filename + " for changes\n");
        var watcher = fs.watch(filename, function() { // callback Funktion. Event: Änderung im File
            connection.write("File " + filename + " has changed: " + Date.now() + "\n");
        });

        connection.on('close', function() { // callback Funktion. Event: Client trennt Verbindung
            console.log("Subscriber disconnected");
            watcher.close();
        });
    });

server.listen(5432, function() {    // callback Funktion
    console.log("Listening to subscribers...");
});