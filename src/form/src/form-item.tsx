import {
  computed,
  ComputedRef,
  defineComponent,
  inject,
  onMounted,
  onUnmounted,
  provide,
  reactive,
  ReactiveEffect,
  ref,
  toRef,
  toRefs
} from 'vue'
import {
  FORM_ITEM_CONTEXT,
  props,
  Props,
  TFormItemContext
} from './form-item-type'
import {
  PROVIDE_FORM_CONTEXT,
  PROVIDE_LABEL_DATA,
  TLabelData
} from './form-type'
import Validator from 'async-validator'
import '../style/form-item.scss'

export default defineComponent({
  name: 'FormItem',
  props,
  setup(props: Props, { slots }) {
    const label = inject(PROVIDE_LABEL_DATA) as ComputedRef<TLabelData>
    const formCtx = inject(PROVIDE_FORM_CONTEXT)
    const formItemClasses = computed(() => ({
      's-form__item': true,
      's-form__item--vertical': label.value.layout === 'vertical',
      's-form__item--horizontal': label.value.layout === 'horizontal'
    }))
    const labelClasses = computed(() => ({
      's-form__label': true,
      's-form__label--vertical': label.value.layout === 'vertical',
      [`s-form__label--${label.value.labelAlign}`]:
        label.value.layout === 'horizontal',
      [`s-form__label--${label.value.labelSize}`]:
        label.value.layout === 'horizontal'
    }))

    // 定义校验方法
    const showMessage = ref(false)
    const errorMessage = ref('')

    const validate = () => {
      // 没有传入表单上下文或者表单项字段名这两种情况算校验失败
      if (!formCtx) {
        console.warn('请在Form中使用FormItem')
        return Promise.reject('请在Form中使用FormItem')
      }

      // 校验字段不存在
      const field = props.field
      if (!field) {
        console.warn('请给FormItem设置field属性')
        return Promise.reject('请给FormItem设置field属性')
      }
      // 规则不存在
      const rules = props.rules || formCtx.rules?.[field]
      if (!rules) {
        return Promise.resolve({ result: true })
      }
      // 获取校验规则对应数值
      const value = formCtx.model[field]
      const validator = new Validator({ [field]: rules })

      return validator.validate({ [field]: value }, errors => {
        if (errors) {
          showMessage.value = true
          errorMessage.value = errors[0].message || '校验错误'
        } else {
          showMessage.value = false
          errorMessage.value = ''
        }
      })
    }

    const formItemContext: TFormItemContext = {
      validate
    }

    onMounted(() => {
      if (props.field) {
        formCtx?.addValidateItem(formItemContext)
      }
    })

    onUnmounted(() => {
      if (props.field) {
        formCtx?.removeValidateItem(formItemContext)
      }
    })

    provide(FORM_ITEM_CONTEXT, formItemContext)
    return () => (
      <div class={formItemClasses.value}>
        {/* label */}
        <span class={labelClasses.value}>{props.label}</span>
        {/* control */}
        <div>{slots.default?.()}</div>
        {showMessage.value && (
          <div class="error-message">{errorMessage.value}</div>
        )}
      </div>
    )
  }
})
