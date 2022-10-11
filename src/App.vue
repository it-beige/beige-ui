<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
import VirtualList from './components/VirtualList.vue'
import Modal from './components/modal.vue'
import Test from './components/Test'
const confirm = (e: Event) => {
  console.log(e)
}
</script>

<template>
  <!-- <bg-button type="default" />
  <bg-button type="primary" size="tiny" />
  <bg-button type="secondary" size="small"> small </bg-button>
  <bg-button type="text" />
  <bg-button type="primary" @click="confirm" />
  <bg-button type="primary" block size="large" disabled @click="confirm">
    large
  </bg-button>
  <VirtualList /> -->
  <Modal />

  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <Test /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
