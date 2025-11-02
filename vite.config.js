import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '')
  
  const isElectron = process.env.ELECTRON === 'true'
  
  return {
    base: isElectron ? './' : undefined, // Use relative paths for Electron
    plugins: [react(), TanStackRouterVite()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 3000,
      open: !isElectron, // Don't open browser when running Electron
    },
    build: {
      outDir: 'dist',
      sourcemap: true,
      // Ensure assets use relative paths for Electron
      assetsDir: 'assets',
    },
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
    },
  }
})

