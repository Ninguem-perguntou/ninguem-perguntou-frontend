import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import { createHtmlPlugin } from 'vite-plugin-html'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          title: 'Ninguém perguntou',
          description: 'É um site de jornalismo online dedicado ao público LGBTQIA+ e mulheres de 18 a 50 anos. Abordamos temas relevantes como saúde, cultura pop e destacamos mulheres inspiradoras na sociedade.',
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  }
})

