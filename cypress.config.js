const { defineConfig } = require("cypress");

module.exports = defineConfig({
    e2e: {
        baseUrl: "http://bagisto.local",
        viewportWidth: 1920,
        viewportHeight: 1080,
        waitForAnimations: false,
        watchForFileChanges: false,
        numTestsKeptInMemory: 1,
        screenshotOnRunFailure: true,
        video: false,
    },
});
