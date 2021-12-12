import { Component, ref } from 'nefbl'
import getLength from '../tool/getLength'
import formatTime from '../tool/formatTime'
import quickSort from '../tool/quickSort'

import AudioJS from '@hai2007/audio'
import Clunch from 'clunch'

import image from './index.clunch'
import uiIndex from './ui-index.js'

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

    hadValue: boolean

    // 当前缓存的长度
    len: number

    $setup() {
        return {
            step: ref('select-file'),
            newTime: ref('0:0.0'),
            hadValue: ref(false)
        }
    }

    // 下载
    download() {

        let trs = document.getElementById('table-list').getElementsByTagName('tr')
        let indexs = []
        for (let index = 0; index < trs.length; index++) {
            if (trs[index].getElementsByTagName('input')[0].checked) indexs.push(index)
        }

        if (indexs.length <= 0) {
            alert('请至少选择一个片段~')
            return
        }

        this.audioJS.merge(...indexs).download(this.len)

        this.len += 1
    }

    // 更新数据
    // 也就是根据切割点，在下面列出一段段的结果
    doUpdate() {

        let _splits = quickSort(this.clunch.splits.slice(0))

        // 同时，消除一些重复的值
        let splits = []
        let preValue = null
        for (let item of _splits) {
            if (item != preValue) {
                splits.push(item)
                preValue = item
            }
        }

        this.audioJS.reset()
        this.len = splits.length - 1

        let template = ""
        for (let index = 1; index < splits.length; index++) {

            // 截取片段
            this.audioJS.extract(splits[index - 1], splits[index])

            // 拼接条码
            template += `<tr>
                <th>
                    <input type="checkbox" checked="checked">
                </th>
                <th>${index}</th>
                <th>${formatTime(splits[index - 1])}</th>
                <th>${formatTime(splits[index])}</th>
            </tr>`
        }

        let tbody = document.getElementById('table-list')

        // 添加内容
        tbody.innerHTML = template

        this.hadValue = true
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
