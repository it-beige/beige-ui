import { computed, defineComponent, provide, toRefs } from 'vue'
import { TFormItemContext } from './form-item-type'
import {
  props,
  Props,
  PROVIDE_FORM_CONTEXT,
  PROVIDE_LABEL_DATA
} from './form-type'

export default defineComponent({
  name: 'Form',
  props,
  setup(props: Props, { slots, expose, emit }) {
    provide(
      PROVIDE_LABEL_DATA,
      computed(() => ({
        layout: props.layout,
        labelSize: props.labelSize,
        labelAlign: props.labelAlign
      }))
    )

    // 存放校验选项
    const formItems = new Set<TFormItemContext>()
    const addValidateItem = (item: TFormItemContext) => {
      formItems.add(item)
    }
    const removeValidateItem = (item: TFormItemContext) => {
      formItems.delete(item)
    }

    const validate = (callback: (valid: boolean) => void) => {
      const validatorTask = []
      formItems.forEach(v => validatorTask.push(v.validate()))
      return Promise.all(validatorTask)
        .then(() => {
          callback(true)
        })
        .catch(() => callback(false))
    }

    expose({ validate })

    // 给用户提供一个事件以执行校验等业务
    function submit(event: Event) {
      event.preventDefault()
      emit('submit')
    }

    provide(PROVIDE_FORM_CONTEXT, {
      model: props.model,
      rules: props.rules,
      addValidateItem,
      removeValidateItem
    })
    return () => {
      return (
        <form class="s-form" onSubmit={submit}>
          {slots.default?.()}
        </form>
      )
    }
  }
})
