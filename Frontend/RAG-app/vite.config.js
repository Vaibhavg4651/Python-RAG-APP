import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  server: {
    headers: {
      'Content-Type': 'application/javascript'
    }
  }
});

