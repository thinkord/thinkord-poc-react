const { ipcMain } = require('electron')
const { recordAudio } = require('./audio')
const { snipaste } = require('./snipaste')
const { recordText } = require('./text')
const { recordVideo } = require('./video')
const { createFile,loadFile } = require('./file')


ipcMain.on('audio', recordAudio)
ipcMain.on('text', recordText)
ipcMain.on('snipaste', snipaste)
ipcMain.on('video', recordVideo)
ipcMain.on('createFile', createFile)
ipcMain.on('loadFile',async(event)=>{
    const data = await loadFile()
    // console.log(data)
    event.sender.send('loadComplete',data)
    // Need to start here
})



