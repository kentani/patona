<template>
  <v-btn
    icon
    variant="outlined"
    color="green1"
    size="x-small"
    :disabled="!trainingCategories.length"
    @click="onClickAddMenu"
  >
    <v-icon
      icon="mdi-plus"
      size="x-large"
    ></v-icon>
  </v-btn>

  <settings-training-menu-form
    ref="menuForm"
  />
</template>

<script setup lang="ts">
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"

const { trainingCategories  } = inject(TrainingCategoryKey) as TrainingCategoryType

const menuForm = ref()

const onClickAddMenu = () => {
  menuForm.value.open()
}
</script>
