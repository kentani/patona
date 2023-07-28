<template>
  <v-btn
    variant="outlined"
    rounded="lg"
    color="error"
    block
    disabled
    @click=""
  >
    <v-icon
      icon="mdi-delete"
    ></v-icon>
    <span class="">削除</span>
  </v-btn>

  <members-d-member-training-data-form
    ref="trainingDataForm"
  />
</template>

<script setup lang="ts">
const trainingDataForm = ref()

const onClickEditMenu = () => {
  trainingDataForm.value.open()
}
</script>
