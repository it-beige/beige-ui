# 表单 Form

## 基础用法

传入 model 属性设置数据模型。

:::demo 传入 model 属性设置数据模型

```vue
<template>
  <bg-form :model="model" :layout="layout" labelSize="lg" labelAlign="start">
    <bg-form-item
      bg-form-item
      label="用户名:"
      field="user"
      @click="layout = 'vertical'"
    >
      <input v-model="model.user" />
    </bg-form-item>
  </bg-form>
  {{ model }}
</template>
<script setup>
import { ref } from 'vue'
const model = ref({
  user: 'tom'
})
const layout = ref('horizontal')
</script>
```

:::

## 表单样式

水平排列模式下，label-size 可以设置 label 的宽度；label-align 可以设置 label 的对齐方式。

:::demo label-size 提供 sm、md、lg 三种大小，分别对应 80px、100px、150px，默认为 md；label-align 可选值为 start、center、end，默认为 start。

```vue
<template>
  <p>
    <span>labelSize:</span>
    <label>
      <input type="radio" value="sm" v-model="labelSize" />
      sm
    </label>
    <label>
      <input type="radio" value="md" v-model="labelSize" />
      md
    </label>
    <label>
      <input type="radio" value="lg" v-model="labelSize" />
      lg
    </label>
  </p>
  <p>
    <span>labelAlign:</span>
    <label>
      <input type="radio" value="start" v-model="labelAlign" />
      start
    </label>
    <label>
      <input type="radio" value="center" v-model="labelAlign" />
      center
    </label>
    <label>
      <input type="radio" value="end" v-model="labelAlign" />
      end
    </label>
  </p>
  <bg-form
    :model="model"
    layout="horizontal"
    :labelAlign="labelAlign"
    :labelSize="labelSize"
  >
    <bg-form-item label="用户名：">
      <input />
    </bg-form-item>
    <bg-form-item label="密码：">
      <input type="password" />
    </bg-form-item>
  </bg-form>
  {{ model }}
</template>
<script setup>
import { ref } from 'vue'
const model = ref({
  user: 'tom',
  password: ''
})
const labelSize = ref('md')
const labelAlign = ref('start')
</script>
```

:::

## 表单校验

:::demo

```vue
<template>
  <bg-form
    :model="model"
    :rules="rules"
    layout="vertical"
    @submit="onLogin"
    ref="loginForm"
  >
    <bg-form-item label="用户名：" field="user">
      <bg-input v-model="model.user" />
    </bg-form-item>
    <bg-form-item label="密码：" field="pwd">
      <bg-input type="password" v-model="model.pwd" />
    </bg-form-item>
    <bg-form-item>
      <button>登录</button>
    </bg-form-item>
  </bg-form>
</template>
<script setup>
import { ref } from 'vue'
const model = ref({
  user: '',
  pwd: ''
})
const rules = ref({
  user: [{ required: true, message: '用户名为必填项' }],
  pwd: [{ required: true, message: '密码为必填项' }]
})

const loginForm = ref(null)
const onLogin = () => {
  loginForm.value.validate(valid => {
    if (valid) {
      alert('登录成功')
    } else {
      alert('校验失败，请重试！')
    }
  })
}
</script>
```

:::
