import { Component, ref } from 'nefbl'
import getLength from '../tool/getLength'
let AudioJS = require('@hai2007/audio')

import style from './index.scss'
import template from './index.html'

@Component({
    selector: "app-root",
    template,
    styles: [style]
})
export default class {

    // 当前的进度
    step: string

    // 音频核心对象
    audioJS: any

    // 当前维护的音频总时长
    time: number

    $setup() {
        return {
            step: ref('select-file')
        }
    }

    doit(event) {

        let file = event.target.files[0]
        let reader = new FileReader()

        reader.onload = () => {
            new AudioJS(reader.result).then(audioJS => {

                // 进入编辑阶段
                this.step = 'editor-file'

                // 记录编辑的核心对象
                this.audioJS = audioJS

                getLength(file).then(time => {
                    this.time = time
                })

            })
        }
        reader.readAsArrayBuffer(file)
    }

}
