<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card
      rounded="lg"
    >
      <v-card-title>
        <common-underlined-text
          text="カテゴリー"
          class="text-body-1 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="categoryName"
          variant="underlined"
          density="compact"
          label="カテゴリー名"
          hide-details
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          @click="onClickCancel"
        >
          閉じる
        </v-btn>

        <v-btn
          variant="text"
          @click="onClickComplete"
        >
          完了
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"

const { gym } = inject(GymKey) as GymType
const { trainingCategory, createTrainingCategory, updateTrainingCategory, setSelectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType

const dialog = ref(false)
const isEdit = ref(false)
const categoryName = ref('')
const currentCategory = ref({ id: '0', name: '' })

const onClickCancel = () => {
  close()
}

const onClickComplete = async () => {
  if(isEdit.value) {
    await updateTrainingCategory(currentCategory.value.id, { name: categoryName.value })
  } else {
    await createTrainingCategory({ gymId: gym.value?.id, name: categoryName.value })
  }

  setSelectedCategory(trainingCategory.value)
  close()
}

const open = (value?: any) => {
  if(value) {
    isEdit.value = true
    currentCategory.value = value
    categoryName.value = value.name
  }
  dialog.value = true
}

const close = () => {
  categoryName.value = ''
  dialog.value = false
}

defineExpose({
  open,
})
</script>
