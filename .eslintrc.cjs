/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: false,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },

  rules: {
    "no-console": "off",
    "no-debugger": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "prettier/prettier": ["error", { endOfLine: "off" }],
  },
};
