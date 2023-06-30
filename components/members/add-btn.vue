<template>
  <v-btn
    variant="outlined"
    color="green1"
    rounded="lg"
    :ripple="false"
    block
    @click="onClickAddBtn"
  >
    <v-icon
      size="large"
      icon="mdi-plus"
    ></v-icon>会員を追加
  </v-btn>

  <members-form
    ref="form"
  />
</template>

<script setup lang="ts">
const form = ref()

const onClickAddBtn = () => {
  form.value.open()
}
</script>
