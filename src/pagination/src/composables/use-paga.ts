import { ref } from 'vue'

export function usePage(defaultPage = 1) {
  const pageIndex = ref(defaultPage)

  const setPageIndex = (current: number) => {
    pageIndex.value = current
  }
  const jumpPage = (page: number) => {
    pageIndex.value += page
  }

  const prevPage = () => jumpPage(-1)
  const nextPage = () => jumpPage(1)
  return {
    pageIndex,
    setPageIndex,
    jumpPage,
    nextPage,
    prevPage
  }
}
