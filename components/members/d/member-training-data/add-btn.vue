<template>
  <v-btn
    icon
    variant="outlined"
    color="green1"
    size="x-small"
    @click="onClickAddMenu"
  >
    <v-icon
      icon="mdi-plus"
      size="x-large"
    ></v-icon>
  </v-btn>

  <members-d-member-training-data-form
    ref="trainingDataForm"
  />
</template>

<script setup lang="ts">
const trainingDataForm = ref()

const onClickAddMenu = () => {
  trainingDataForm.value.open()
}
</script>
