const {app, BrowserWindow} = require('electron');
const path = require('path');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 700, minWidth: 800, minHeight:700});
    
    // load the index.html of the app.

    // mainWindow.loadFile(path.join(__dirname, '/build/index.html')); // PROD
    // mainWindow.setMenu(null); //PROD
    mainWindow.loadURL('http://localhost:3000'); // DEV
    if (process.platform === 'darwin') app.dock.setIcon(path.join(__dirname, 'assets/icons/png/logo.png')); //DEV
    
    
    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
    
    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null;
    });
}

app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    // if (process.platform !== 'darwin') {
    //     app.quit();
    // }

    // No thanks, just kill the app if i hit close btn
    app.quit();
})

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow();
    }
})
