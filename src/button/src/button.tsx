import { defineComponent, toRefs } from 'vue';
import { props, Props } from './button-type';

export default defineComponent({
  name: 'BgButton',
  props,
  setup(props: Props, { slots }) {
    const { type, size, disabled, block } = toRefs(props)
    const blockCls = block.value ? 's-btn--block' : ''
    return () => {
      return (
        <button disabled={disabled.value} class={`s-btn s-btn--${type.value} s-btn--${size.value} ${blockCls}`}>
          {slots.default ? slots.default() : '按钮'}
        </button>
      )
    }

  }
})