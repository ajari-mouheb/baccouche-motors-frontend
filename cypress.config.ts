import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    specPattern: "cypress/e2e/**/*.cy.ts",
    supportFile: "cypress/support/e2e.ts",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false,
    screenshotOnRunFailure: true,
    retries: {
      runMode: process.env.CI ? 2 : 0,
    },
    setupNodeEvents(on, config) {
      config.env.E2E_API_AVAILABLE =
        process.env.E2E_API_AVAILABLE === "1" ||
        process.env.E2E_API_AVAILABLE === "true";
      return config;
    },
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
  },
});
