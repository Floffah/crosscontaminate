import Nedb from "nedb";
import { resolve } from "path";
import { app } from "electron";
import { pr } from "src/lib/util/promises";
import {
    defaultSettingsModel,
    ProviderModel,
    SettingsModel,
} from "src/typings/models";
import chalk from "chalk";

export class DatabaseProvider {
    public readonly idb: Nedb;
    public settings: SettingsModel;
    private initiallySyncedSettings = false;

    constructor() {
        console.log(
            chalk.green("info!"),
            "Using nedb location",
            chalk.cyan(resolve(app.getPath("userData"), "internal.db")),
        );
        this.idb = new Nedb({
            filename: resolve(app.getPath("userData"), "internal.db"),
            autoload: true,
        });
        this.settings = defaultSettingsModel;
    }

    public async init() {
        await this.syncSettings();
    }

    public async syncSettings() {
        // await this.createProvider({
        //     name: "test",
        //     provider: "github",
        //     reponame: "crosscontaminate",
        //     token: "fdsfnsd",
        //     username: "floffah",
        // });
        const prevsettings = await pr<SettingsModel>((_, cb) =>
            this.idb.findOne({ _id: "settings" }, cb),
        );
        const settings = prevsettings || defaultSettingsModel;
        if (!prevsettings) {
            await this.idb.insert(defaultSettingsModel);
        }

        if (!this.initiallySyncedSettings) {
            this.settings = settings;
            this.initiallySyncedSettings = true;
        } else {
            this.idb.update(
                { _id: "settings" },
                { $set: { ...this.settings } },
            );
        }
    }

    public get remoteSyncingEnabled() {
        return this.settings.features.remoteSyncing.enabled;
    }

    public set remoteSyncingEnabled(enabled: boolean) {
        this.settings.features.remoteSyncing.enabled = enabled;
        this.idb.update({ _id: "settings" }, { $set: { ...this.settings } });
    }

    public async createProvider(provider: Omit<ProviderModel, "_id" | "id">) {
        const allProviders = await this.getAllProviders();
        let biggestId = -1;
        for (const p of allProviders) {
            if (p.id > biggestId) {
                biggestId = p.id;
            }
        }

        const savedProvider: ProviderModel = {
            ...provider,
            id: biggestId + 1,
            _id: `provider_${biggestId + 1}`,
        };

        await this.idb.insert(savedProvider);
    }

    public getAllProviders(): Promise<ProviderModel[]> {
        return new Promise((resolve, reject) => {
            this.idb.find<ProviderModel>(
                {
                    _id: {
                        $regex: /provider_[0-9]+/,
                    },
                },
                (err: Error | null, docs: ProviderModel[]) => {
                    if (err) reject(err);
                    else resolve(docs);
                },
            );
        });
    }
}
