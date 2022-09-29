import { defineComponent, inject, provide, toRefs } from 'vue'
import { props, Props } from './input-type'
import '../style/input.scss'
import {
  FORM_ITEM_CONTEXT,
  TFormItemContext
} from '../../form/src/form-item-type'

export default defineComponent({
  name: 'Input',
  props,
  emits: ['update:modelValue'],
  setup(props: Props, { emit }) {
    const formItemCtx = inject(FORM_ITEM_CONTEXT) as TFormItemContext
    const onInput = (event: Event) => {
      const target = event.target as HTMLInputElement
      emit('update:modelValue', target.value)
      formItemCtx.validate()
    }
    return () => (
      <div class="s-input__wrapper">
        <input
          class="s-input__input"
          type={props.type}
          value={props.modelValue}
          onInput={onInput}
        />
      </div>
    )
  }
})
