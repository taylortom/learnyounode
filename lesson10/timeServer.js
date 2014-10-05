var dateFormat = require("./dateformat");
var net = require("net");

var server = net.createServer(function(connection) { //'connection' listener
    connection.write(getFormattedTime() + "\n");
    connection.end();
});

var getFormattedTime = function() { return dateFormat(new Date(), "yyyy-mm-dd HH:MM"); }

server.listen(process.argv[2]);
