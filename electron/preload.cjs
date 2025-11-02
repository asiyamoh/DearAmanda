const { contextBridge } = require('electron');

// Expose protected methods that allow the renderer process
// to use Node.js functionality in a secure way
contextBridge.exposeInMainWorld('electronAPI', {
  // Example: You can add Electron-specific APIs here if needed
  // For example, file system access, native dialogs, etc.
  
  // Platform information
  platform: process.platform,
  
  // Version information
  versions: {
    node: process.versions.node,
    chrome: process.versions.chrome,
    electron: process.versions.electron,
  },
  
  // Example: File operations (if needed in the future)
  // openFile: () => ipcRenderer.invoke('dialog:openFile'),
});

