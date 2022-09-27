import { ref } from 'vue'

export function usePage(defaultPage = 1) {
  const pageIndex = ref(defaultPage)

  const setPageIndex = (current: number) => {
    pageIndex.value = current
  }

  const jumpPage = (page: number) => {
    pageIndex.value += page
  }

  const nextPage = () => {
    pageIndex.value++
  }

  const prevPage = () => {
    pageIndex.value !== 1 && pageIndex.value--
  }
  return {
    pageIndex,
    setPageIndex,
    jumpPage,
    nextPage,
    prevPage
  }
}
