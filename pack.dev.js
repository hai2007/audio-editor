const common = require('./pack.common.js');
const { merge } = require('@nefbl/pack');

module.exports = merge(common, {
    devServer: {
        contentBase: "./",
        port: 20000
    },
    mode: "development"
});
