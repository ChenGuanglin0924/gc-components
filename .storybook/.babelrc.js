module.exports = { 
    "presets": [
        "@babel/env",
        "@babel/react",
        "@babel/typescript"
    ], 
    "plugins" : [
        "@babel/plugin-transform-runtime",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-optional-chaining",
        "react-docgen"
    ]
};