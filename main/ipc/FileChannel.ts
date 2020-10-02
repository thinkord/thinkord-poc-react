import { ipcMain, IpcMainEvent } from "electron";
import { IIpcChannel } from "./IIpcChannel";
import { loadFile } from "../utils/file";
export class FileChannel implements IIpcChannel {
    channelName

    constructor(channelName: string) {
        this.channelName = channelName
        ipcMain.on(this.channelName, (event: IpcMainEvent, command: string, args: any) => {
            switch (command) {
                case 'save':
                case 'delete':
                case 'load':
                    this[command](event, args)
                    break;
                default:
                    console.log('There is no command in thic channel')
                    break;
            }
        })
    }

    save(event, args) {
        console.log(args)
        event.reply('fuck', 'u')
    }

    async load(event: IpcMainEvent, args: any) {
        const data = await loadFile()
        event.reply('loadComplete', data)
    }

    delete(event, args) {
        console.log(args)
    }


    getName(): string {
        throw new Error("Method not implemented.");
    }
    setName(name: string) {
        throw new Error("Method not implemented.");
    }
}