import { computed, defineComponent, onMounted, ref, toRefs } from 'vue'
import { props, Props } from './virtual-list-type'
import '../style/virtual-list.scss'

export default defineComponent({
  name: 'VirtualList',
  props,
  setup(props: Props, { slots }) {
    const { data, itemHeight, tag: Component } = toRefs(props)
    const containerRef = ref()

    const containerHeight = ref(0)
    const offsetY = ref(0)
    const loadedIndex = ref(0)

    const visibleCount = computed(
      () => containerHeight.value / itemHeight.value
    )
    const visbileData = computed(() =>
      data.value.slice(
        loadedIndex.value,
        Math.min(loadedIndex.value + visibleCount.value, data.value.length)
      )
    )

    const scrollHandle = (event: UIEvent) => {
      const target = event.target as HTMLElement
      const scrollTop = target.scrollTop
      loadedIndex.value = Math.floor(scrollTop / itemHeight.value)
      offsetY.value = scrollTop - (scrollTop % itemHeight.value)
    }

    onMounted(() => {
      containerHeight.value = containerRef.value?.clientHeight
    })

    return () => (
      <Component.value
        class="s-virtual-list__container"
        onScroll={scrollHandle}
        ref={containerRef}
      >
        <div
          class="s-virtual-list__scroll"
          style={{
            height: `${itemHeight.value * data.value.length}px`
          }}
        ></div>
        <div
          class="s-virtual-list"
          style={{ transform: `translate3D(0, ${offsetY.value}px, 0)` }}
        >
          {visbileData.value.map((...args) => slots.default?.(...args))}
        </div>
      </Component.value>
    )
  }
})
