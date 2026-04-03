import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'src/Labs/lab-29/cypress/**/*.cy.js'
  }
});
