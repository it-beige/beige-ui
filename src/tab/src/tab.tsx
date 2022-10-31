import { defineComponent, inject, ref, toRefs } from 'vue'
import { props, Props } from './tab-type'
import { PROVIDE_TAB_OPERATE, TProvide } from './tabs-type'

export default defineComponent({
  name: 'Tab',
  props,
  setup(props: Props, { slots }) {
    const { title, id } = toRefs(props)
    const { addTab, activeTab } = inject(PROVIDE_TAB_OPERATE) as TProvide
    addTab({ id: props.id, title: props.title })

    return () => (
      <>
        {activeTab.value === id.value && (
          <div class="s-tab">{title?.value}</div>
        )}
      </>
    )
  }
})
