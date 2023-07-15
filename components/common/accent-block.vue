<template>
  <div class="accent-block">
    <span class="title">{{ title }}</span>
    <span class="text">{{ text }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  text: string
}

const Props = withDefaults(defineProps<Props>(), {
  title: '',
  text: ''
})
</script>

<style scoped>
.accent-block {
  .title {
    background-color: rgb(var(--v-theme-background2));
    z-index: 100;
    border-radius: 8px;
    padding: 6px;
    margin-right: 6px;
  }
}
</style>
