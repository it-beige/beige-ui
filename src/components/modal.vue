<template>
  <BgButton type="primary" @click="modalVisible = true">打开</BgButton>
  <BgBaseModal v-model="modalVisible">
    <div
      style="
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translateY(-50%) translateX(-50%);
      "
    >
      <img src="../assets/sheep.webp" />
    </div>
  </BgBaseModal>
</template>
<script lang="ts" setup>
import BgBaseModal from '../modal/base-modal'
import { ref } from 'vue'

const modalVisible = ref(true)
</script>

<style scoped lang="scss"></style>
