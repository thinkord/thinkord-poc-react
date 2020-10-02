import * as fs from "fs";

export function loadFile(): Promise<string> {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/real-dev-data.json', function (err: NodeJS.ErrnoException, data: Buffer) {
            if (err) {
                reject(err)
            } else {
                resolve(data.toString())
            }
        })
    })
}