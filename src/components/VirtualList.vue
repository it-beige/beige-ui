<template>
  <!-- 滚动容器 -->
  <div class="virtual-list__container" @scroll="scrollEvent">
    <!-- 用于显示真实数量的滚动条 -->
    <div
      class="virtual-list__scroll"
      :style="{ height: TotalConut * ItemHeight + 'px' }"
    ></div>
    <!-- 滚动列表 -->
    <div
      class="virtual-list"
      :style="{ transform: `translate3d(0, ${offsetY}px, 0)` }"
    >
      <div
        v-for="item of visibleData"
        :key="item.value"
        class="virtual-list__item"
      >
        {{ item.value }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, defineComponent, ref } from 'vue'
// 元素高度
const ItemHeight = 24
// 容器高度
const ContainerHeight = 600
// 总数量
const TotalConut = 1000
// 可显示的元素数量
const visibleCount = Math.ceil(ContainerHeight / ItemHeight)
// 显示的元素对应索引
let loadedIndex = ref(0)

let offsetY = ref(0)

const totalData = ref(
  Array.from({ length: TotalConut }).map((_, v) => ({ value: v }))
)
const visibleData = computed(() => {
  return totalData.value.slice(
    loadedIndex.value,
    loadedIndex.value + visibleCount
  )
})

const scrollEvent = (event: UIEvent) => {
  debugger
  const target = event.target as HTMLElement
  loadedIndex.value = Math.floor(target.scrollTop / ItemHeight)
  offsetY.value = target.scrollTop
}
</script>

<style scoped lang="scss">
.virtual-list {
  & {
    transform: translate3d(0, 0, 0);
  }
  &__item {
    height: 24px;
  }
  &__container {
    overflow: auto;
    position: relative;
  }
  &__scroll {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
  }
}
</style>
