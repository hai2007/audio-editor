module.exports = function (source) {

    if (/\.css$/.test(this.resourcePath)) {
        //    todo
    } else {
        source = require('@hai2007/algorithm').scss(source);
    }

    // 解析css文件和scss文件
    return "export default `" + source + "`";

}
