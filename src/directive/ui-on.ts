import { Directive } from 'nefbl'
import xhtml from '@hai2007/tool/xhtml'

/**
 * [可以使用的修饰符]
 * .prevent 阻止默认事件
 * .stop    阻止冒泡
 * .once    只执行一次
 */

@Directive({
    selector: "ui-on"
})
export default class {
    $inserted(el, binding) {
        let types = binding.type.split('.'), modifier = {

            "prevent": false,
            "stop": false,
            "once": false

        }, callback = function (event) {

            if (modifier.stop) xhtml.stopPropagation(event)
            if (modifier.prevent) xhtml.preventDefault(event)

            binding.value.apply(binding.target, [event])

            if (modifier.once) {
                xhtml.unbind(el, types[0], callback)
            }

        }

        for (let i = 1; i < types.length; i++) {
            modifier[types[i]] = true
        }

        xhtml.bind(el, types[0], callback)

    }
}
