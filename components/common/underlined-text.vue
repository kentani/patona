<template>
  <span
    class="underlined"
  >
    {{ text }}
  </span>
</template>

<script setup lang="ts">
interface Props {
  text: string
}

const Props = withDefaults(defineProps<Props>(), {
  text: ''
})
</script>

<style scoped>
.underlined {
  position: relative;
  display: inline-block;
}
.underlined:before {
  content: '';
  position: absolute;
  bottom: -5px;
  display: inline-block;
  width: 100%;
  height: 2px;
  left: 50%;
  -webkit-transform: translateX(-50%);
  transform: translateX(-50%);
  background-color: #006666;
  border-radius: 2px;
}
</style>
