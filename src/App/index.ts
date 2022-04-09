import { Component, ref } from 'nefbl'
import { isFunction } from "@hai2007/tool/type"

import urlFormat from '../tool/urlFormat'

import style from './index.scss'
import template from './index.html'

let pages = {
    "menu": () => import('./menu/index'),
    "split": () => import('./split/index')
}

@Component({
    selector: "app-root",
    template,
    styles: [style]
})
export default class {

    currentPage: any

    $setup() {
        return {
            currentPage: ref(null)
        }
    }

    $mounted() {

        // 地址栏信息
        let urlObj = urlFormat(globalThis.location.href)

        // 获取当前页面
        let page = pages[urlObj.router[0]]

        // 或者页面不存在
        if (!isFunction(page)) {

            // 如果地址错误，跳转到菜单页面
            page = pages['menu']
        }

        // 打开页面
        page().then(data => {
            this.currentPage = data.default
        })

    }

}