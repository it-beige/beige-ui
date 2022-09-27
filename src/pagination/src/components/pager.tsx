import { computed, defineComponent, toRefs, watch } from 'vue'
import { getCureetnPage } from '../utils'
import { usePage } from '../composables/use-paga'
import { props, Props } from './pager-type'

export default defineComponent({
  name: 'Pager',
  props,
  emits: ['update:modelValue', 'page'],
  setup(props: Props, { emit }) {
    const { total, pageSize, pagerCount } = toRefs(props)
    const { prevPage, nextPage, pageIndex, jumpPage, setPageIndex } = usePage()
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))
    const centerPages = computed(() => {
      return getCureetnPage(pageIndex.value, pagerCount.value, totalPage.value)
    })

    // 每当内部的 pageIndex 发生变化，都将最新的 pageIndex 值暴露给外部
    watch(
      () => pageIndex.value,
      (newVal: number) => {
        emit('update:modelValue', newVal)
        emit('page', newVal)
      }
    )

    return {
      totalPage,
      pageIndex,
      setPageIndex,
      jumpPage,
      centerPages,
      prevPage,
      nextPage
    }
  },
  render() {
    const {
      pagerCount,
      totalPage,
      pageIndex,
      setPageIndex,
      jumpPage,
      centerPages
    } = this
    const getCureetnCls = (page: number) => {
      return { current: pageIndex === page }
    }
    return (
      <ul class="s-pager">
        <li onClick={() => setPageIndex(1)} class={{ ...getCureetnCls(1) }}>
          1
        </li>

        {/* 
            <!-- 左更多按钮显示的条件有2个： -->
            <!-- 1. 总页码totalPage要大于最大页码按钮数量pagerCount -->
            <!-- 2. 当前页码大于 Math.ceil(pagerCount / 2) -->
          */}
        {totalPage > pagerCount && pageIndex > Math.ceil(pagerCount / 2) && (
          <li class="more left" onClick={() => jumpPage(-5)}>
            ...
          </li>
        )}
        {centerPages.map(page => {
          return (
            <li
              key={page}
              onClick={() => setPageIndex(page)}
              class={{ ...getCureetnCls(page) }}
            >
              {page}
            </li>
          )
        })}
        {/*   
            <!-- 右更多按钮显示的条件也有2个： -->
            <!-- 1. 总页码totalPage要大于最大页码按钮数量pagerCount（和左更多按钮相同） -->
            <!-- 2. 当前页码小于 totalPage - Math.ceil(pagerCount / 2) + 1 -->
          */}
        {totalPage > pagerCount &&
          pageIndex < totalPage - Math.ceil(pagerCount / 2) + 1 && (
            <li class="more right" onClick={() => jumpPage(5)}>
              ...
            </li>
          )}
        {totalPage > 1 && (
          <li
            onClick={() => setPageIndex(totalPage)}
            class={{ ...getCureetnCls(totalPage) }}
          >
            {totalPage}
          </li>
        )}
      </ul>
    )
  }
})
