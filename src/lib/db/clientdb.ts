import Dexie from "dexie";

export interface KeychainEntry {
    id: number;
    name: string;
    value: string;
}

export class KeychainDexie extends Dexie {
    keychain!: Dexie.Table<KeychainEntry, string>;

    constructor() {
        super("crosscontaminateKeychain");

        this.version(2).stores({
            keychain: "++id, name, value",
        });
    }
}
