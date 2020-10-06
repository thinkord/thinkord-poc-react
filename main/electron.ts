import { app, BrowserWindow } from "electron";
import isDev from 'electron-is-dev'
import * as path from "path";
import { IIpcChannel } from "./ipc/IIpcChannel";
import { FileChannel } from "./ipc/FileChannel";
import { Sequelize } from 'sequelize';
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
})

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((err: any) => {
    console.log(err)
});

class Main {
    private win?: BrowserWindow | null

    public async init(channel: IIpcChannel[]) {
        // const sequelize = new Sequelize('sqlite::memory:')


        app.on('ready', this.createWindow)
        app.on('window-all-closed', this.onWindowAllClosed)
        app.on('activate', this.onActivate)
    }

    private onWindowAllClosed() {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }
    private onActivate() {
        if (!this.win) {
            this.createWindow()
        }
    }

    private createWindow() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                // enableRemoteModule: true,
                contextIsolation: true,
                preload: path.resolve(__dirname, 'preload.js')
            }
        });

        this.win.loadURL(isDev ? "http://localhost:3000" : `file://${path.join(__dirname, '../build/index.html')}`)
        this.win.once('ready-to-show', () => {
            if (this.win) {
                this.win.show()
            }
        })
        this.win.on('closed', () => {
            this.win = null
        })
    }
}

(new Main()).init([
    new FileChannel('fileprocess')
])

