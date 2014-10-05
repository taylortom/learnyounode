var http = require("http");

var urls = process.argv.slice(2);
var urlData = [];
var totes = 0;

var output = function() {
    for(var i = 0; i < totes; i++) console.log(urlData[i]);
};

var onReponseEnd = function(url, data) {
    var index = urls.indexOf(url);
    urlData[index] = data;
    totes++;
    if(totes === urls.length) output();
};

var get = function(url, callback) {
    http.get(url, function(response){
        var fullResponse = "";
        urlData.push(fullResponse);

        response.setEncoding("utf8");
        response.on("data", function(data) { fullResponse += data; });
        response.on("end", function() { onReponseEnd(url, fullResponse); });
    });
};

for(var i = 0; i < urls.length; i++) get(urls[i]);
