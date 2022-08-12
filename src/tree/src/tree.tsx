
import { defineComponent, toRefs } from 'vue';
import { props, Props } from './tree-type';

export default defineComponent({
  name: 'BgTree',
  props,
  setup(props: Props) {
    return (
      <div class="s-tree">
      </div>
    )
  }
})
