import { KeychainDexie } from "src/lib/db/clientdb";
import TypedEmitter from "typed-emitter";

export type CommsLayerEvents = {
    keychainAltered: () => void;
};

export interface CommsLayerKeychainData<Initialised extends boolean> {
    keychainInitialised: Initialised;

    setKeychain: Initialised extends false
        ? (keychain: KeychainDexie) => void
        : undefined;
}

export interface CommsLayer extends CommsLayerKeychainData<boolean> {
    openExternal(url: string): Promise<void>;
    openDataFolder(): Promise<void>;

    events: TypedEmitter<CommsLayerEvents>;
}

export enum CommsChannels {
    URLS = "crosscontaminate-urls",
}

export enum URLSType {
    OPEN_EXTERNAL = "open-external",
    OPEN_DATA_FOLDER = "open-data-folder",
}
