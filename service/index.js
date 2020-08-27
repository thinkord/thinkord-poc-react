const { ipcMain } = require('electron')
const { recordAudio } = require('./audio')
const { snipaste } = require('./snipaste')
const { recordText } = require('./text')
const { recordVideo } = require('./video')
const { createFile, loadFile, saveFile } = require('./file')


ipcMain.on('audio', recordAudio)
ipcMain.on('text', recordText)
ipcMain.on('snipaste', snipaste)
ipcMain.on('video', recordVideo)


ipcMain.on('createFile', createFile)
ipcMain.on('loadFile', async (event) => {
    const data = await loadFile()
    event.sender.send('loadComplete', data)
})
ipcMain.on('saveFile', async (event, data) => {
    await saveFile(data)
})



