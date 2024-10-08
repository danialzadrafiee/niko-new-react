/// <reference types="vite/client" />

interface ImportMeta {
    readonly env: ImportMetaEnv
  }
  
  interface ImportMetaEnv {
    readonly VITE_STORAGE_URL: string
    // Add other environment variables as needed
  }