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
          text="メニューを追加"
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
            <v-select
              v-model="selectedCategoryModel"
              label="カテゴリー"
              variant="outlined"
              density="compact"
              :items="trainingCategories"
              item-title="name"
              item-value="id"
              :disabled="!trainingCategories.length"
              return-object
              color="green1"
              validate-on="blur"
              :rules="[rules.required]"
              @update:modelValue="onChangeCategory"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="menuName"
              label="メニュー名"
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


const { gym } = inject(GymKey) as GymType
const { selectedCategory, trainingCategories, setSelectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { createTrainingMenu, updateTrainingMenu } = inject(TrainingMenuKey) as TrainingMenuType

const dialog = ref(false)
const isEdit = ref(false)
const menuName = ref('')
const selectedCategoryModel = ref({ id: '0', name: '' })
const currentMenu = ref({ id: '0', name: '', categoryId: '0' })

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
