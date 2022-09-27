export const getCureetnPage = (
  pageIndex: number,
  pagerCount: number,
  totalPage: number
) => {
  // 获取所有页数的数组
  const totalPageArr = [...Array(totalPage).keys()]
  // [0, 1, 2, 3, 4, 5, 6, 7]
  // 页码全部显示
  if (totalPage <= pagerCount) {
    return totalPageArr.slice(2, totalPage)
  } else {
    // 计算可显示页码的中位数
    const middle = Math.ceil(pagerCount / 2) // 4

    // 显示左边部分
    if (pageIndex <= middle) {
      return totalPageArr.slice(2, pagerCount)
    } else if (pageIndex >= totalPage - middle + 1) {
      // pageIndex=6
      return totalPageArr.slice(totalPage - pagerCount + 2, totalPage)
    } else {
      return totalPageArr.slice(pageIndex - middle + 2, pageIndex + middle - 1)
    }
  }
}
