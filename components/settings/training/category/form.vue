<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    :fullscreen="$vuetify.display.xs"
    persistent
  >
    <v-card
      variant="flat"
      :rounded="$vuetify.display.xs ? 0 : 'lg'"
      color="background"
      class="text-font"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          text="カテゴリーを追加"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            cols="12"
          >
            <common-underlined-text
              text="基本情報"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-error font-weight-bold"
            >
              ※必須
            </span>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="categoryName"
              label="カテゴリー名"
              type="text"
              variant="outlined"
              density="compact"
              color="green1"
              validate-on="blur"
              :rules="[rules.required]"
            ></v-text-field>
          </v-col>
        </v-row>

      </v-card-text>

      <v-card-actions>
        <v-btn
          rounded="lg"
          class="text-red"
          :ripple="false"
          size="large"
          :disabled="!isDeletable()"
          @click="onClickDelete"
        >
          削除
        </v-btn>

        <v-spacer />

        <v-btn
          rounded="lg"
          class="text-grey"
          :ripple="false"
          size="large"
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>

        <v-btn
          color="green1"
          class="font-weight-bold"
          rounded="lg"
          :ripple="false"
          size="large"
          @click="onClickComplete"
        >
          保存
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
import { TrainingType } from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"

const { gym } = inject(GymKey) as GymType
const { trainingCategory, whereTrainingCategory, createTrainingCategory, updateTrainingCategory, deleteTrainingCategory, setSelectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { whereTrainingMenu, trainingMenus } = inject(TrainingMenuKey) as TrainingMenuType
const { trainings } = inject(TrainingKey) as TrainingType

const dialog = ref(false)
const isEdit = ref(false)
const categoryName = ref('')
const currentCategory = ref({ id: '0', name: '' })

const route = useRoute()

const rules = ref({
  required: (value: any) => isRequired(value) || '必須項目です',
})

const isRequired = (value: any) => {
  if(!value) return false

  if(Array.isArray(value)) return !!value.length

  if(typeof value === 'object') return !!Object.keys(value).length

  return !!value.length
}

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

const onClickDelete = async () => {
  await deleteTrainingCategory(currentCategory.value.id)

  await whereTrainingCategory({
    gymId: String(route.query.gymId),
  })

  await whereTrainingMenu({
    gymId: String(route.query.gymId),
  })

  setSelectedCategory({ id: '0', name: '' })

  close()
}

const isDeletable = () => {
  let categoryIds = trainingMenus.value.map(m => m.categoryId)
  if (categoryIds.includes(currentCategory.value?.id)) return false

  categoryIds = trainings.value.map(m => m.categoryId)
  if (categoryIds.includes(currentCategory.value?.id)) return false

  return true
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
