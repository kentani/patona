<template>
  <v-btn
    icon
    variant="outlined"
    color="green1"
    size="x-small"
    @click="onClickAddPhysicalData"
  >
    <v-icon
      icon="mdi-plus"
      size="x-large"
    ></v-icon>
  </v-btn>

  <members-d-member-physical-data-form
    ref="physicalDataForm"
  />
</template>

<script setup lang="ts">
const physicalDataForm = ref()

const onClickAddPhysicalData = () => {
  physicalDataForm.value.open({ isEdit: false })
}
</script>
