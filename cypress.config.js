const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://bagisto.local", // base url of the application
        viewportWidth: 1920,
        viewportHeight: 1080,
        waitForAnimations: true,
        watchForFileChanges: false,
        numTestsKeptInMemory: 3,
        screenshotOnRunFailure: false, // disable screenshots for better performance
        video: false, // disable video recording for better performance
        scrollBehavior: "nearest",
    },
});

