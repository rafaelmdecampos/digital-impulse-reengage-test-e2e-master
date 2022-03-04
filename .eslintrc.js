module.exports = {
    "plugins": ["protractor"],
    "extends": ["eslint:recommended", "plugin:protractor/recommended"],
    "env": {
        "node": true,
        "es6": true
    },
    "globals": {
        "require": true,
        "process": true,
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "script"
    },
    "rules": {
        "indent": ["error", 4],
        "no-undef": ["off"],
        "no-unused-vars": ["off"],
        "no-case-declarations": ["off"]
    }
};