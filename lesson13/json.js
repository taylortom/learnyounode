var http = require("http");
var url = require("url");

var server = http.createServer(function(request, response) {
    if(request.method !== "GET") return response.end("Only accepting GET requests.");

    var urlData = url.parse(request.url, true);
    var date = new Date(urlData.query.iso);
    var responseData = {};

    switch(urlData.pathname) {
        case "/api/parsetime":
            responseData.hour = date.getHours();
            responseData.minute = date.getMinutes();
            responseData.second = date.getSeconds();
            break;
        case "/api/unixtime":
            responseData.unixtime = date.getTime();
            break;
        default:
            return response.end("Invalid URL passed: " + urlData.pathname);
    }
    response.end(JSON.stringify(responseData));
});

server.listen(process.argv[2]);
