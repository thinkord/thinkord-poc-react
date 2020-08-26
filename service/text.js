const fs = require('fs')

function recordText() {
    fs.readFile('test.txt', function (err,data) {
        if (err)
            return console.log(err);
        else
            console.log(data.toString());
    });
}


module.exports = {
    recordText
}