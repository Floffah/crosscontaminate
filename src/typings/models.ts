export interface BaseModel<ID extends string> {
    _id: ID;
}

export interface SettingsModel extends BaseModel<"settings"> {
    features: {
        networkLinks: {
            enabled: false;
        };
        remoteSyncing:
            | {
                  enabled: false;
              }
            | {
                  enabled: true;
                  provider: "github";
              };
    };
}

export const defaultSettingsModel: SettingsModel = {
    _id: "settings",
    features: {
        networkLinks: {
            enabled: false,
        },
        remoteSyncing: {
            enabled: false,
        },
    },
};

export interface ProviderModel extends BaseModel<`provider_${number}`> {
    id: number;
    name: string;
    username: string;
    reponame: string;
    provider: "github";
    token: string;
}
