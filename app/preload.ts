// placeholder preload

import { contextBridge, ipcRenderer } from "electron/renderer";
import {
    CommsChannels,
    CommsLayer,
    CommsLayerEvents,
    URLSType,
} from "src/typings/comms";
import { KeychainDexie } from "src/lib/db/clientdb";
import { EventEmitter } from "eventemitter3";
import TypedEmitter from "typed-emitter";

// window.addEventListener("DOMContentLoaded", () => {
let globalKeychain: KeychainDexie | undefined = undefined;

const internalEvents = new EventEmitter() as TypedEmitter<CommsLayerEvents>;
const comms: CommsLayer = {
    keychainInitialised: false,
    setKeychain: (keychain: KeychainDexie) => {
        if (comms.keychainInitialised)
            throw new Error("Keychain already initialised");
        comms.keychainInitialised = true;
        globalKeychain = keychain;
        globalKeychain; //temporary

        window.comms = comms;
    },

    // destructured like this because without it electron seems to have no knowledge of these functions and does not expose them
    events: {
        addListener: internalEvents.addListener.bind(internalEvents),
        removeListener: internalEvents.removeListener.bind(internalEvents),
        emit: internalEvents.emit.bind(internalEvents),
        off: internalEvents.off.bind(internalEvents),
        on: internalEvents.on.bind(internalEvents),
        once: internalEvents.once.bind(internalEvents),
        get prependListener() {
            return (
                internalEvents.prependListener?.bind(internalEvents) ??
                internalEvents.on.bind(internalEvents)
            );
        },
        set prependListener(value) {
            internalEvents.prependListener = value;
        },
        get prependOnceListener() {
            return (
                internalEvents.prependOnceListener?.bind(internalEvents) ??
                internalEvents.prependOnceListener
            );
        },
        set prependOnceListener(value) {
            internalEvents.prependOnceListener = value;
        },
        eventNames: internalEvents.eventNames.bind(internalEvents),
        listenerCount: internalEvents.listenerCount.bind(internalEvents),
        get getMaxListeners() {
            return (
                internalEvents.getMaxListeners?.bind(internalEvents) ??
                internalEvents.getMaxListeners
            );
        },
        set getMaxListeners(value) {
            internalEvents.getMaxListeners = value;
        },
        get setMaxListeners() {
            return (
                internalEvents.setMaxListeners?.bind(internalEvents) ??
                internalEvents.setMaxListeners
            );
        },
        set setMaxListeners(value) {
            internalEvents.setMaxListeners = value;
        },
        listeners: internalEvents.listeners.bind(internalEvents),
        get rawListeners() {
            return (
                internalEvents.rawListeners?.bind(internalEvents) ??
                internalEvents.rawListeners
            );
        },
        set rawListeners(value) {
            internalEvents.rawListeners = value;
        },
        removeAllListeners:
            internalEvents.removeAllListeners.bind(internalEvents),
    },

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

window.comms = comms;
contextBridge.exposeInMainWorld("comms", comms);
// });
