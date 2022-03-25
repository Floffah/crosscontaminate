import { DatabaseProvider } from "src/api/dbprovider";
import { CommsLayer } from "src/typings/comms";

declare global {
    let INTERNAL_DB: DatabaseProvider;

    interface Window {
        Comms: CommsLayer;
    }
}
