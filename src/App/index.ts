import { Component, ref } from 'nefbl'
import getLength from '../tool/getLength'

let AudioJS = require('@hai2007/audio')
let Clunch = require('clunch')

import image from './index.clunch'
import uiIndex from './index.js'

import style from './index.scss'
import template from './index.html'

Clunch.series({
    'ui-index': uiIndex
})

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

    // 切割点编辑对象
    clunch: any

    // 新增切割点值
    newTime: string

    $setup() {
        return {
            step: ref('select-file'),
            newTime: ref('0:0.0')
        }
    }

    // 更新数据
    // 也就是根据切割点，在下面列出一段段的结果
    doUpdate() {

    }

    // 新增切割点
    addSplit() {
        let temp = this.newTime.split(':')
        this.clunch.splits.push((+temp[0]) * 60 - -temp[1])
    }

    // 拖拽的时候鼠标松开的范围扩大
    doMouseup() {
        this.clunch.index = -1
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

                    this.clunch = new Clunch({
                        el: document.getElementById('time-line'),
                        debug: false,
                        data() {
                            return {

                                flag: -1,

                                // 总时长
                                time,

                                // 切割点
                                // 初始化的时候只有起点和终点
                                splits: [0, time],

                                // 表示当前选中的是谁
                                index: -1
                            }
                        },
                        render: image,
                        methods: {
                            doSelect(target) {
                                this.index = +target.subRegion
                            }
                        }
                    }).$bind('mousemove', function (target) {

                        if (this.index != -1 && target.left >= 30 && target.left <= this._width - 30) {
                            this.splits[this.index] = +((target.left - 30) / (this._width - 60) * this.time).toFixed(3)
                            this.flag = new Date().valueOf()
                        }

                    })

                })

            })
        }
        reader.readAsArrayBuffer(file)
    }

}
