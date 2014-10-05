var fileFilter = require("./fileFilterMod");

fileFilter(process.argv[2], process.argv[3], function(error, files) {
    if(error) return console.log("fileFilter: " + error.message);

    for(var i = 0; i < files.length; i++) {
        console.log(files[i]);
    }
});
