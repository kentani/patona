<template>
  <v-row
    dense
  >
    <v-col
      v-for="category in trainingCategories"
      :key="category.id"
      cols="auto"
    >
      <v-btn
        variant="outlined"
        color="green1"
        rounded="lg"
        @click="onClickCategory(category)"
      >
        {{ category.name }}
      </v-btn>
    </v-col>
  </v-row>

  <settings-training-category-form
    ref="categoryForm"
  />
</template>

<script setup lang="ts">
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"

const { trainingCategories  } = inject(TrainingCategoryKey) as TrainingCategoryType

const categoryForm = ref()

const onClickCategory = (category: any) => {
  categoryForm.value.open(category)
}
</script>
