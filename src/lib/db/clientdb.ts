import Dexie, { Table } from "dexie";

export interface KeychainEntry {
    id: number;
    name: string;
    value: string;
}

export class KeychainDexie extends Dexie {
    keychain: Table<KeychainEntry, string>;

    constructor() {
        super("crosscontaminateKeychain");

        this.version(1).stores({
            keychain: "++id, name, value",
        });

        this.keychain = this.table("keychain");
    }
}
