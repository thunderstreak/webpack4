const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

let mainWindow;

// create windows app
function createWindow() {
    mainWindow = new BrowserWindow({width: 800, height: 600});

    // loading app
    mainWindow.loadURL('http://192.168.16.62:8008');

    // closed app
    mainWindow.on('closed', () => mainWindow = null);

    mainWindow.webContents.openDevTools({ mode : 'right' });
}

// electron init create window
app.on('ready', createWindow);

// electron closed window
app.on('windows-all-closed', () => {
    if(process.platform !== 'darwin'){
        app.quit();
    }
});

// electron active window
app.on('active', () => !mainWindow && createWindow());
