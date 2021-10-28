export default function (url) {

    let splitTemp = url.split('?');
    let routerTemp = (splitTemp[0] + "#").split("#")[1].replace(/^\//, '').replace(/\/$/, '').split('/');
    let paramTemp = splitTemp[1] || "";

    let paramResult, paramArray;
    if (paramTemp == "") {
        paramResult = {};
    } else {
        paramArray = paramTemp.split("&"), paramResult = {};
        paramArray.forEach(item => {
            let temp = item.split("=");
            paramResult[temp[0]] = temp[1];
        });
    }

    let resultData = {
        router: routerTemp[0] == '' ? [] : routerTemp,
        params: paramResult
    };

    return resultData;
};
