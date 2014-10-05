var fs = require("fs");

var fileFilter = function(pPath, pExtension, pCallback) {
    fs.readdir(pPath, function(error, files) {
        if(error) return pCallback(error);
        var filesArr = [];
        for(var i = 0; i < files.length; i++) {
            /*var isDir = fs.lstatSync(pPath + "/" + files[i]).isDirectory();
            if(isDir) {
                fileFilter(pPath + "/" + files[i], pExtension, function(error, filess) {
                    filesArr = filesArr.concat(filess);
                });
            }
            else {
                var index = files[i].indexOf("." + pExtension);
                if(index !== -1) filesArr.push(files[i]);
            }*/
            var index = files[i].indexOf("." + pExtension);
            if(index !== -1) filesArr.push(files[i]);
        }
        pCallback(null, filesArr);
    });

};

module.exports = fileFilter;
