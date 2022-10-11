import { computed, defineComponent, toRefs } from 'vue'
import { props, Props } from './icon-type'

export default defineComponent({
  name: 'Icon',
  props,
  setup(props: Props, { attrs }) {
    const { name, prefix, color, component } = toRefs(props)

    // 获取尺寸
    const iconSize = computed(() => {
      return typeof props.size === 'number' ? `${props.size}px` : props.size
    })

    const isRemoteIcon = /^http|https/.test(name.value)
    // 远程资源用img显示
    const imgIcon = <img src={name.value} {...attrs} />

    // 图标字体
    const fontIcon = (
      <span
        class={[prefix.value, `${prefix.value}-${name.value}`]}
        {...attrs}
      ></span>
    )

    // svg显示
    const svgIcon = (
      <svg
        class="icon"
        style={{
          width: iconSize.value,
          height: iconSize.value
        }}
      >
        <use
          xlinkHref={`#${prefix.value}-${component.value}`}
          fill={color.value}
        ></use>
      </svg>
    )

    const iconVnode = component.value
      ? svgIcon
      : isRemoteIcon
      ? imgIcon
      : fontIcon
    return () => iconVnode
  }
})
