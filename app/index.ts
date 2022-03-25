import { app, BrowserWindow, dialog, Menu, Tray } from "electron";
import next from "next";
import { createServer } from "http";
import { parse } from "url";
import { AddressInfo } from "net";
import { resolve } from "path";
import { DatabaseProvider } from "src/api/dbprovider";
import { registerIPCMainHandlers } from "app/ipcmainHandlers";

// chalk.level = 3;

let tray: Tray | null = null,
    win: BrowserWindow | null = null;
(async () => {
    await app.whenReady();
    win = new BrowserWindow({
        minHeight: 600,
        minWidth: 600,
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false,
            preload: resolve(__dirname, "preload.js"),
            webSecurity: true,
            contextIsolation: true,
        },
        fullscreenable: false,
        center: true,
        title: "CrossContaminate",
        show: false,
        icon: resolve(__dirname, "../public/icons/oil-spill.icns"),
    });

    win.on("close", () => app.exit(0));

    tray = new Tray(
        resolve(__dirname, "../public/icons/oil-spill-smallest.png"),
    );
    tray.setToolTip("Cross contaminate");

    INTERNAL_DB = new DatabaseProvider();
    await INTERNAL_DB.init();

    registerIPCMainHandlers();

    const nextApp = next({
        dev: process.env.NODE_ENV === "development",
        // conf: require("../next.config"),
    });
    const handle = nextApp.getRequestHandler();

    await nextApp.prepare();
    const server = createServer(async (req, res) => {
        if (!req.url) {
            res.statusCode = 500;
            res.end("internal server error - no url");
        }
        const parsedUrl = parse(req.url as string, true);
        await handle(req, res, parsedUrl);
    }).listen(0);

    const addr = server.address();
    if (!addr || typeof addr === "string") {
        dialog.showErrorBox(
            "Error starting CrossContaminate",
            "Internal next server did not have a usable address",
        );
        app.exit(1);
    }
    const port = (addr as AddressInfo).port;

    const trayMenu = Menu.buildFromTemplate([
        {
            label: "Settings",
            click: () => win?.loadURL(`http://localhost:${port}/settings`),
        },
        {
            label: "Quit",
            click: () => app.exit(0),
        },
    ]);

    tray.setContextMenu(trayMenu);

    await win.loadURL(`http://localhost:${port}`);
    win.show();
})();
