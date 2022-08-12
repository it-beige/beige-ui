import { defineComponent, toRefs, createVNode } from 'vue'
const props = {
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'medium'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
}
var Button = defineComponent({
  name: 'BgButton',
  props,
  setup(props2, { slots }) {
    const { type, size, disabled, block } = toRefs(props2)
    const blockCls = block.value ? 's-btn--block' : ''
    return () => {
      return createVNode(
        'button',
        {
          disabled: disabled.value,
          class: `s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`
        },
        [slots.default ? slots.default() : '\u6309\u94AE']
      )
    }
  }
})
var ButtonPlugin = {
  install(app) {
    app.component(Button.name, Button)
  }
}
var version = '0.1.0'
const plugins = [ButtonPlugin]
var entry = {
  version,
  install(app) {
    plugins.forEach(p => app.use(p))
  }
}
export { Button, entry as default }
