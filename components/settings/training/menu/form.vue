<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card>
      <v-card-title>
        <common-underlined-text
          text="メニュー"
          class="text-body-1 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-select
          v-model="selectedCategoryModel"
          variant="underlined"
          :items="trainingCategories"
          item-title="name"
          item-value="id"
          :disabled="!trainingCategories.length"
          label="カテゴリー"
          return-object
          @update:modelValue="onChangeCategory"
        ></v-select>

        <v-text-field
          v-model="menuName"
          variant="underlined"
          density="compact"
          label="メニュー名"
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
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"


const { gym } = inject(GymKey) as GymType
const { selectedCategory, trainingCategories, setSelectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { createTrainingMenu, updateTrainingMenu } = inject(TrainingMenuKey) as TrainingMenuType

const dialog = ref(false)
const isEdit = ref(false)
const menuName = ref('')
const selectedCategoryModel = ref({ id: '0', name: '' })
const currentMenu = ref({ id: '0', name: '', categoryId: '0' })

const onClickCancel = () => {
  close()
}

const onClickComplete = async () => {
  if(isEdit.value) {
    await updateTrainingMenu(currentMenu.value.id, { categoryId: selectedCategoryModel.value.id, name: menuName.value })
  } else {
    await createTrainingMenu({ gymId: gym.value?.id, categoryId: selectedCategoryModel.value.id, name: menuName.value })
  }

  close()
}

const onChangeCategory = () => {
  setSelectedCategory(selectedCategoryModel.value)
}

const open = (value?: any) => {
  if(value) {
    isEdit.value = true
    currentMenu.value = value
    menuName.value = value.name
  }
  selectedCategoryModel.value = selectedCategory.value
  dialog.value = true
}

const close = () => {
  menuName.value = ''
  dialog.value = false
}

defineExpose({
  open,
})
</script>
