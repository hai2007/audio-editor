import { Directive, setValue } from 'nefbl'
import xhtml from '@hai2007/tool/xhtml'

@Directive({
    selector: "ui-model"
})
export default class {
    $inserted(el, binding) {
        el.value = binding.value
        xhtml.bind(el, 'input', () => {
            setValue(binding.target, "." + binding.exp, el.value)
        })
    }
    $update(el, binding) {
        el.value = binding.value
    }
}
