import { app, ipcMain, shell } from "electron";
import { CommsChannels, URLSType } from "src/typings/comms";

export function registerIPCMainHandlers() {
    registerURLHandler();
}

function registerURLHandler() {
    ipcMain.handle(
        CommsChannels.URLS,
        (_event, type: URLSType, url: string) => {
            switch (type) {
                case URLSType.OPEN_EXTERNAL:
                    shell.openExternal(url);
                    break;
                case URLSType.OPEN_DATA_FOLDER:
                    shell.openPath(app.getPath("userData"));
                    break;
            }
        },
    );
}
