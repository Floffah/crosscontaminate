import { KeychainDexie } from "src/lib/db/clientdb";

export interface CommsLayer {
    openExternal(url: string): Promise<void>;
    openDataFolder(): Promise<void>;

    keychain: KeychainDexie;
}

export enum CommsChannels {
    URLS = "crosscontaminate-urls",
}

export enum URLSType {
    OPEN_EXTERNAL = "open-external",
    OPEN_DATA_FOLDER = "open-data-folder",
}
