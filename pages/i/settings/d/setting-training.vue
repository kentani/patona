<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-text>
      <v-row
        dense
        class="mb-3"
      >
        <v-col
          cols="auto"
          align-self="center"
        >
          <common-underlined-text
            text="カテゴリー"
            class="mb-2 text-h6 font-weight-bold"
          />
        </v-col>

        <v-spacer />

        <v-col
          cols="auto"
          align-self="center"
        >
          <settings-training-category-add-btn />
        </v-col>
      </v-row>

      <settings-training-category-list />

      <v-divider class="my-6" />

      <v-row
        dense
        class="mb-3"
      >
        <v-col
          cols="auto"
          align-self="center"
        >
          <common-underlined-text
            text="メニュー"
            class="mb-2 text-h6 font-weight-bold"
          />
        </v-col>

        <v-spacer />

        <v-col
          cols="6"
          sm="4"
          align-self="center"
        >
          <v-select
            v-model="selectedCategoryModel"
            variant="outlined"
            :items="trainingCategories"
            item-title="name"
            item-value="id"
            :disabled="!trainingCategories.length"
            density="compact"
            color="green1"
            hide-details
            return-object
            @update:modelValue="onChangeCategory"
          ></v-select>
        </v-col>

        <v-col
          cols="auto"
          align-self="center"
        >
          <settings-training-menu-add-btn />
        </v-col>
      </v-row>

      <settings-training-menu-list
        ref="trainingMenuList"
      />
    </v-card-text>
  </v-card>
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

const { gym, onLoadedGym } = inject(GymKey) as GymType
const { trainingCategories, selectedCategory, whereTrainingCategory, setSelectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { whereTrainingMenu } = inject(TrainingMenuKey) as TrainingMenuType
const { whereTraining } = inject(TrainingKey) as TrainingType

const trainingMenuList = ref()
const selectedCategoryModel = ref({ id: '0', name: '' })

const onChangeCategory = () => {
  setSelectedCategory(selectedCategoryModel.value)
  trainingMenuList.value.setMenu()
}

watchEffect(() => {
  selectedCategoryModel.value = selectedCategory.value
})

onMounted(async () => {
  await onLoadedGym().then(async () => {
    await whereTrainingCategory({ gymId: gym.value?.id  })
    await whereTrainingMenu({ gymId: gym.value?.id  })
    await whereTraining({ gymId: gym.value?.id  })
    setSelectedCategory(trainingCategories.value[0])
    trainingMenuList.value.setMenu()
  })
})
</script>
