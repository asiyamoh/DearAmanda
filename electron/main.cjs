const { app, BrowserWindow } = require('electron');
const path = require('path');

// Keep a global reference of the window object
let mainWindow = null;

function createWindow() {
  // Create the browser window
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      nodeIntegration: false, // Security: keep this false
      contextIsolation: true, // Security: keep this true
      sandbox: false, // Needed for preload to work properly
    },
    titleBarStyle: 'default',
    show: false, // Don't show until ready
  });

  // Load the app
  const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
  
  if (isDev) {
    // In development, load from Vite dev server (assumed to be running separately)
    // Use wait-on in package.json scripts to ensure Vite is ready
    mainWindow.loadURL('http://localhost:3000');
    
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
    
    // Handle dev server connection errors
    mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      if (errorCode === -106) {
        // ERR_INTERNET_DISCONNECTED or connection failed
        console.error('Failed to connect to Vite dev server. Make sure "npm run dev" is running.');
        mainWindow.loadURL('data:text/html,<h1>Waiting for Vite dev server...</h1><p>Please start the dev server with: npm run dev</p>');
      }
    });
  } else {
    // In production, load from the built files
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // Show window when ready to prevent visual flash
  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    
    // Focus the window
    if (isDev) {
      mainWindow.focus();
    }
  });

  // Handle window closed
  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  // Handle external links - open in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    require('electron').shell.openExternal(url);
    return { action: 'deny' };
  });
}

// This method will be called when Electron has finished initialization
app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

