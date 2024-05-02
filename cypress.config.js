const { defineConfig } = require("cypress");
const {loadEnv} = require("vite");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: loadEnv("", process.cwd()).VITE_APP_URL,
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});
