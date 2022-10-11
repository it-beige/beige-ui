## 基本用法

:::demo 设置图标字体中 name 或者远程资源地址。

```vue
<template>
  <bg-icon name="Vue"></bg-icon>
  <bg-icon
    name="https://sponsors.vuejs.org/images/vuemastery.png"
    width="30"
  ></bg-icon>
</template>
```

## 尺寸

设置 size 可以设置图标尺寸

:::demo 设置 size 可以设置图标尺寸

```vue
<template>
  <bg-icon name="vuejs" size="30px"></bg-icon>
  <bg-icon name="react" :size="30"></bg-icon>
  <bg-icon name="angular" :size="30"></bg-icon>
</template>
```

:::

## 颜色

设置 color 可以设置图标颜色

:::demo 设置为合法的颜色字符串即可

```vue
<template>
  <bg-icon name="vuejs" size="30px" color="green"></bg-icon>
  <bg-icon name="react" :size="30" color="blue"></bg-icon>
  <bg-icon name="angular" :size="30" color="red"></bg-icon>
</template>
```

:::

## svg 图标

设置 component 可以显示 svg 图标。

:::demo component 设置为 symbolId 即可

```vue
<template>
  <bg-icon component="vuejs" size="30px" color="green"></bg-icon>
  <bg-icon component="react" :size="30" color="blue"></bg-icon>
  <bg-icon component="angular" :size="30" color="red"></bg-icon>
</template>
```

:::
