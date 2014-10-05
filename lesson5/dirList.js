var fs = require("fs");

fs.readdir(process.argv[2], function(err, files) {
    for(var i = 0; i < files.length; i++) {
        var index = files[i].indexOf("." + process.argv[3]);
        if(index !== -1) console.log(files[i]); 
    }
});
