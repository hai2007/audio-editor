const common = require('./pack.common.js');
const { merge } = require('@nefbl/pack');

module.exports = merge(common, {
    mode: "production"
});
