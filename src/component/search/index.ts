import { Component, ref } from 'nefbl'
import openPage from '../../tool/openPage'

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "search",
    template,
    styles: [style]
})
export default class {

    wd: string

    $setup() {
        return {
            wd: ref('')
        }
    }

    goSearch(event) {

        // 如果是回车就带着数据跳转到查询界面
        if (event.keyCode == 13) openPage("https://hai2007.gitee.io/sweethome/#/search?wd=" + encodeURIComponent(this.wd))

    }

}
