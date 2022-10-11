import { defineComponent, toRefs } from 'vue'
import { Props, props } from './modal-type'
import BaseModal from './base-modal'
import './modal.scss'

export default defineComponent({
  name: 'Modal',
  props,
  emits: ['update:modelValue'],
  setup(props: Props, { slots, emit }) {
    const { title, modelValue, showClose, width, alignCenter } = toRefs(props)

    const modalContainerStyle = alignCenter.value
      ? {
          marginTop: 0,
          top: '50%',
          transform: 'translateY(-50%)'
        }
      : {}
    const closeHandle = () => {
      emit('update:modelValue', false)
    }
    return () => (
      <BaseModal
        class="s-modal"
        modelValue={modelValue.value}
        onUpdate:modelValue={val => emit('update:modelValue', val)}
      >
        <div
          class="s-modal__container"
          style={{ width: width?.value, ...modalContainerStyle }}
        >
          {slots.header?.({ close: () => closeHandle() }) || (
            <div class="s-modal__header">
              <span class="s-modal__header--title">{title.value}</span>
              {/* 增加关闭按钮 */}
              {showClose.value && (
                <svg
                  onClick={() => closeHandle()}
                  class="s-modal__close"
                  viewBox="0 0 1024 1024"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"
                  ></path>
                </svg>
              )}
            </div>
          )}
          <div class="s-modal__body">{slots.default?.()}</div>
          <div class="s-modal__footer">{slots.footer?.()}</div>
        </div>
      </BaseModal>
    )
  }
})
