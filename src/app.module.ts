import { Module } from 'nefbl'

// 主界面
import AppComponent from './App/index'

// 组件
import search from './component/search/index'

// 指令
import uiBind from 'sprout-ui/nefbl/directive/ui-bind'
import uiModel from 'sprout-ui/nefbl/directive/ui-model'
import uiOn from 'sprout-ui/nefbl/directive/ui-on'

@Module({
    declarations: [
        AppComponent,
        search,
        uiBind, uiModel, uiOn
    ],
    imports: [],
    exports: [],
    bootstrap: AppComponent
})
export default class {

}
