# Tab 页签

## 基础

bg-tabs 包裹若干 bg-tab 即可，设置`v-model`控制激活页签 id

:::demo

```vue
<template>
  <bg-tabs v-model="activeTab">
    <bg-tab id="tab1" title="Tab1">Tab1 Content</bg-tab>
    <bg-tab id="tab2" title="Tab2">Tab2 Content</bg-tab>
    <bg-tab id="tab3" title="Tab3">Tab3 Content</bg-tab>
  </bg-tabs>
</template>
<script setup>
import { ref } from 'vue'
const activeTab = ref('tab1')
</script>
<style>
.vp-doc li + li {
  margin-top: 0;
}
</style>
```

:::

## 关闭、新增标签

添加 closable 和 addable 课关闭、新增标签。

:::demo 添加 closable 和 addable 课关闭、新增标签。

```vue
<template>
  <bg-tabs v-model="activeTab" closable addable>
    <bg-tab id="tab1" title="Tab1">Tab1 Content</bg-tab>
    <bg-tab id="tab2" title="Tab2">Tab2 Content</bg-tab>
    <bg-tab id="tab3" title="Tab3">Tab3 Content</bg-tab>
  </bg-tabs>
</template>
<script setup>
import { ref } from 'vue'
const activeTab = ref('tab1')
</script>
```

:::
