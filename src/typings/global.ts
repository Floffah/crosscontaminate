import { DatabaseProvider } from "src/api/dbprovider";
import { CommsLayer } from "src/typings/comms";
import { KeychainDexie } from "src/lib/db/clientdb";

declare global {
    let INTERNAL_DB: DatabaseProvider;

    interface Window {
        comms: CommsLayer;
        keychain: KeychainDexie;
    }
}
