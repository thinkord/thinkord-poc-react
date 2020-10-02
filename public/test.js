const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')
require('../service/index')

const windows = new Set()

function createMainWindow() {
    let x, y
    const currentWindow = BrowserWindow.getFocusedWindow()
    if (currentWindow) {
        const [currentWindowX, currentWindowY] = currentWindow.getPosition()
        x = currentWindowX + 10
        y = currentWindowY + 10
    }
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true,
            // enableRemoteModule: true,
            contextIsolation: true,
            preload: path.resolve(__dirname, 'preload.js')
        }
    })

    win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, "../build/index.html")}`)
    win.once('ready-to-show', () => {
        win.show()
    })
    win.on('closed', () => {
        windows.delete(win)
        win = null
    })

    windows.add(win)
    return win
}

function createControlBarWindow() {
    let win = new BrowserWindow({
        width: 400,
        height: 100,
        webPreferences: {
            enableRemoteModule: true,
            nodeIntegration: true
        }
    })
    win.loadURL(isDev ? "http://localhost:3000/controlbar.html" : `file://${path.join(__dirname, "../build/controlbar.html")}`)

    win.once('ready-to-show', () => {
        win.show()
    })
}



app.on('ready', async () => {
    createMainWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        return false
    }
    app.quit();
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createMainWindow()
    }
})



ipcMain.on('main', createMainWindow)
ipcMain.on('controlbar', createControlBarWindow)



