var http = require("http");

var server = http.createServer(function(request, response) {
    if(request.method !== "POST") return res.end("Only accepting POST requests");

    request.setEncoding("utf8");
    var data = "";
    request.on('data', function(chunk) { data += chunk; });
    request.on('end', function(chunk) {
        response.write(data.toUpperCase());
        response.end();
    });
});

server.listen(process.argv[2]);
