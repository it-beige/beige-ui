import { computed, defineComponent, onMounted, ref } from 'vue'
import { props, Props } from './pagination-type'
import '../style/pagination.scss'
import Pager from './components/pager'

export default defineComponent({
  name: 'Pagination',
  props,
  setup(props: Props, { attrs }) {
    const pager = ref()

    const prevDisabled = computed(() => {
      return pager.value && pager.value.pageIndex === 1
    })

    const nextDisabled = computed(() => {
      return pager.value && pager.value.pageIndex === pager.value.totalPage
    })

    return () => (
      <div class="s-pagination">
        <button
          disabled={prevDisabled.value}
          onClick={() => pager.value.prevPage()}
        >
          上一页
        </button>
        <Pager {...props} {...attrs} ref={pager} />
        <button
          disabled={nextDisabled.value}
          onClick={() => pager.value.nextPage()}
        >
          下一页
        </button>
      </div>
    )
  }
})
