# Modal

## 基础功能

:::demo

```vue
<template>
  <bg-button @click="open">打开</bg-button>

  <bg-modal
    v-model="visible"
    title="小贴士"
    center
    :show-close="false"
    align-center
  >
    <span>这是一条消息！</span>
    <template #footer>
      <div class="dialog-footer">
        <bg-button @click="visible = false">确定</bg-button>
      </div>
    </template>
  </bg-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true
    }

    return {
      visible,
      open
    }
  }
})
</script>

<style>
.dialog-footer {
  padding: 20px;
  text-align: right;
}
</style>
```

:::

## 自定义内容

:::demo 通过插槽可以自定义 Modal 内容。我们有 title、default 和 footer 三个插槽可以使用。

```vue
<template>
  <bg-button @click="open">打开</bg-button>

  <bg-modal v-model="visible" title="Shipping address" width="50%">
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Name</th>
          <th>Address</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>2016-05-02</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
        <tr>
          <td>2016-05-04</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
        <tr>
          <td>2016-05-01</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
        <tr>
          <td>2016-05-03</td>
          <td>John Smith</td>
          <td>No.1518, Jinshajiang Road, Putuo District</td>
        </tr>
      </tbody>
    </table>
  </bg-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)

    const open = () => {
      visible.value = true
    }

    return {
      visible,
      open
    }
  }
})
</script>
```

:::

## 自定义头部

可以通过 header 插槽定义头部内容。

:::demo 通过 header 插槽定义头部，上下文中有 close 方法用于关闭 Modal

```vue
<template>
  <bg-button @click="open">打开</bg-button>

  <bg-modal v-model="visible" :show-close="false">
    <template #header="{ close }">
      <div class="my-header">
        <h4>This is a custom header!</h4>
        <bg-button type="danger" @click="close"> Close </bg-button>
      </div>
    </template>
    This is dialog content.
  </bg-modal>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const visible = ref(false)
    const open = () => {
      visible.value = true
    }

    return {
      visible,
      open
    }
  }
})
</script>

<style>
.my-header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  margin-right: 16px;
  word-break: break-all;
}
</style>
```

:::
