
const { app, BrowserWindow, Notification, session } = require('electron')
const {jQuery} = require('jquery')
const url = require("url");



function createWindow () {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        },
        icon: __dirname + "/logo3.ico",
        show: false
    })

    //load the index.html from a url
    win.loadURL('http://localhost:3000');

    // Open the DevTools.
    //win.webContents.openDevTools()
    win.once('ready-to-show', () => {
        win.show();
    });


}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.

    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})


const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

function showNotification () {
    new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}
/*
var getJSON = function(url, callback) {

    var XMLHttpRequest = require('xhr2');
    var xmlhttprequest  = new XMLHttpRequest();

    xmlhttprequest.open('GET', url, true);
    xmlhttprequest.responseType = 'json';

    xmlhttprequest.onload = function() {

        var status = xmlhttprequest.status;

        if (status == 200) {
            callback(null, xmlhttprequest.response);
        } else {
            callback(status, xmlhttprequest.response);
        }
    };

    xmlhttprequest.send();
};

function getData(){
getJSON('https://api.tdameritrade.com/v1/marketdata/AAPL/quotes?apikey=IHJOHJXPNGNLZCIYDGVD05SZCEM9UXNU',  function(err, data) {

    if (err != null) {
        console.error(err);
    } else {

        var display = `Name: ${data.AAPL.description}     
Ticker: ${data.AAPL.symbol}
Price: ${data.AAPL.lastPrice}`;
    }
    console.log(display);
});}

setInterval(getData, 1000)*/
//app.whenReady().then(showNotification)
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.