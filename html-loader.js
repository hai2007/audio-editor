module.exports = function (source) {

    // 解析html文件
    return "export default " + JSON.stringify(source);

}
