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

// Get from the database
// process it to the specific format
exports.loadFile = () => {
    return new Promise((resolve, reject) => {
        // find this user's collections
        fs.readFile(`./data/real-dev-data.json`, function (err, data) {
            if (err) {
                reject(err)
            }
            resolve(data.toString())
        })
    })
}

exports.saveFile = (content) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(`./data/dev-data.json`, content, function (err) {
            if (err) {
                reject(err)
            }
            resolve(`Write successfully`)
        })
    })
}

