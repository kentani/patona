<template>
  <v-btn
    variant="outlined"
    color="green1"
    rounded="lg"
    :ripple="false"
    block
    @click="onClickAddGym"
  >
    <v-icon
      size="large"
      icon="mdi-plus"
    ></v-icon>ジムを追加
  </v-btn>

  <gyms-form
    ref="form"
  />
</template>

<script setup lang="ts">
const form = ref()

const onClickAddGym = () => {
  form.value.open()
}
</script>
