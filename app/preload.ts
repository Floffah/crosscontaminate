// placeholder preload

import { contextBridge, ipcRenderer } from "electron/renderer";
import { CommsChannels, CommsLayer, URLSType } from "src/typings/comms";
import { KeychainDexie } from "src/lib/db/clientdb";

// window.addEventListener("DOMContentLoaded", () => {
const comms: CommsLayer = {
    keychain: new KeychainDexie(),

    async openExternal(url: string) {
        await ipcRenderer.invoke(
            CommsChannels.URLS,
            URLSType.OPEN_EXTERNAL,
            url,
        );
    },
    async openDataFolder() {
        await ipcRenderer.invoke(CommsChannels.URLS, URLSType.OPEN_DATA_FOLDER);
    },
};

window.Comms = comms;
contextBridge.exposeInMainWorld("Comms", comms);
// });
