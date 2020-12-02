module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  globals: {
    /**
     * A workaround for 'Next.js' to enable `"jsx": "react"`
     * @see https://github.com/vercel/next.js/issues/8663
     */
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  projects: [
    /**
     * Configuring different test environments.
     * For React components: 'jsdom'
     * For hooks, theme: node
     * @see https://stackoverflow.com/questions/41318115/testing-two-environments-with-jest
     */
    "<rootDir>/src/pages",
    "<rootDir>/src/components",
    "<rootDir>/src/hooks",
    "<rootDir>/src/theme",
  ],
  /**
   * Anything else goes into the `jest.config.json` files in every project's root folder.
   * @see https://github.com/kulshekhar/ts-jest/issues/1648
   */
};
