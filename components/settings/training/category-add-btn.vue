<template>
  <v-btn
    icon
    variant="outlined"
    color="green1"
    size="x-small"
    @click="onClickAddCategory"
  >
    <v-icon
      icon="mdi-plus"
      size="x-large"
    ></v-icon>
  </v-btn>

  <settings-training-category-form
    ref="categoryForm"
  />
</template>

<script setup lang="ts">
const categoryForm = ref()

const onClickAddCategory = () => {
  categoryForm.value.open()
}
</script>
