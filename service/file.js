const fs = require('fs')

exports.createFile = (event, filename) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./data/${filename}.txt`, null, function (err) {
            if (err) {
                reject(err)
            }
            resolve('Create success')
        })
    })
}

exports.loadFile = () => {
    return new Promise((resolve, reject) => {
        // find this user's collections
        fs.readFile(`./data/dev-data.json`, function (err, data) {
            if (err) {
                reject(err)
            }
            resolve(data.toString())
        })
    })
}

// process it to the specific format
// send to the renderer process