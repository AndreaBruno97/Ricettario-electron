const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

/*TODO move this section in a separate file*/
var Datastore = require('nedb-promises');
var recipes = Datastore.create({ filename: `${path.join(__dirname, '../storage/db/recipes.db')}`, autoload: true });

console.log("wwwwwwwwwwwwwwwwwwww")
recipes.find({})
    .then(
    (doc)=>{
    console.log(doc)}
)
/**/

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({width: 900, height: 680});
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
    mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow();
    }
});