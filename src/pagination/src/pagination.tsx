import { computed, defineComponent, toRefs } from 'vue'
import { usePage } from './composables/use-paga'
import { props, Props } from './pagination-type'

export default defineComponent({
  name: 'Pagination',
  props,
  setup(props: Props) {
    const { total, pageSize, pagerCount } = toRefs(props)
    const { pageIndex, jumpPage, setPageIndex, nextPage, prevPage } = usePage()
    const totalPage = computed(() => Math.ceil(total.value / pageSize.value))

    return () => (
      <div class="s-pagination">
        <button onClick={() => prevPage()}>上一页</button>
        <ul class="s-pager">
          <li>1</li>

          {/* 
            <!-- 左更多按钮显示的条件有2个： -->
            <!-- 1. 总页码totalPage要大于最大页码按钮数量pagerCount -->
            <!-- 2. 当前页码大于 Math.ceil(pagerCount / 2) -->
          */}
          {totalPage.value > pagerCount.value &&
            pageIndex.value > Math.ceil(pagerCount.value / 2) && (
              <li class="more left">...</li>
            )}
          <li>中间页码 - {pageIndex.value}</li>
          {/*   
            <!-- 右更多按钮显示的条件也有2个： -->
            <!-- 1. 总页码totalPage要大于最大页码按钮数量pagerCount（和左更多按钮相同） -->
            <!-- 2. 当前页码小于 totalPage.value - Math.ceil(pagerCount.value / 2) + 1 -->
          */}
          {totalPage.value > pagerCount.value &&
            pageIndex.value <
              totalPage.value - Math.ceil(pagerCount.value / 2) + 1 && (
              <li class="more right" onClick={() => jumpPage(5)}>
                ...
              </li>
            )}
          <li>{totalPage.value}</li>
        </ul>
        <button onClick={() => nextPage()}>下一页</button>
      </div>
    )
  }
})
