<template>
  <v-container>
    <v-card variant="flat">
      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <div>カテゴリー</div>
            <v-btn @click="onClickAddCategory">追加</v-btn>
          </div>
        </v-col>

        <v-col v-for="category in trainingCategories" cols="auto">
          {{ category.name }}
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <div class="d-flex">
            <div>メニュー</div>
            <v-select
              v-model="selectedCategory"
              :items="trainingCategories"
              item-title="name"
              item-value="id"
              :disabled="!trainingCategories.length"
              return-object
              @update:modelValue="onChangeCategory"
            ></v-select>
            <v-btn :disabled="!trainingCategories.length" @click="onClickAddMenu">追加</v-btn>
          </div>
        </v-col>

        <v-col v-for="menu in currentMenus" cols="auto">
          {{ menu.name }}
        </v-col>
      </v-row>
    </v-card>

    <v-dialog
      v-model="categoryDialog"
    >
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="categoryName"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="onClickCancelAddCategory"
          >
            閉じる
          </v-btn>

          <v-btn
            variant="text"
            @click="onClickCompleteAddCategory"
          >
            完了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="menuDialog"
    >
      <v-card>
        <v-card-text>
          <v-select
            v-model="selectedCategory"
            :items="trainingCategories"
            item-title="name"
            item-value="id"
            :disabled="!trainingCategories.length"
            return-object
            @update:modelValue="onChangeCategory"
          ></v-select>

          <v-text-field
            v-model="menuName"
          ></v-text-field>
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn
            variant="text"
            @click="onClickCancelAddMenu"
          >
            閉じる
          </v-btn>

          <v-btn
            variant="text"
            @click="onClickCompleteAddMenu"
          >
            完了
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"
import { DocumentData } from "@firebase/firestore"

const { appUser, onLoadedAppUser } = inject(AuthKey) as AuthType
const { gym, onLoadedGym } = inject(GymKey) as GymType
const { trainingCategories, whereTrainingCategory, createTrainingCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { trainingMenus, whereTrainingMenu, createTrainingMenu } = inject(TrainingMenuKey) as TrainingMenuType

const categoryDialog = ref(false)
const categoryName = ref('')

const menuDialog = ref(false)
const menuName = ref('')
const selectedCategory = ref({ id: '0', name: '' })
const currentMenus = ref([{ id: '0', categoryId: '0', name: '' }])

// カテゴリー
const onClickAddCategory = () => {
  categoryDialog.value = true
}
const onClickCancelAddCategory = () => {
  categoryName.value = ''
  categoryDialog.value = false
}
const onClickCompleteAddCategory = async () => {
  await createTrainingCategory({ gymId: gym.value?.id, name: categoryName.value })
  categoryName.value = ''
  categoryDialog.value = false
}

// メニュー
const onChangeCategory = () => {
  setMenu()
  console.log('currentMenus.value', currentMenus.value)
}
const onClickAddMenu = () => {
  menuDialog.value = true
}
const onClickCancelAddMenu = () => {
  menuName.value= ''
  menuDialog.value = false
}
const onClickCompleteAddMenu = async () => {
  await createTrainingMenu({ gymId: gym.value?.id, categoryId: selectedCategory.value.id, name: menuName.value })
  menuName.value= ''
  menuDialog.value = false
}

const setCategory = () => {

}

const setMenu = () => {
  let tmpMenus = trainingMenus.value.filter(menu => menu.categoryId === selectedCategory.value.id)
  currentMenus.value = tmpMenus.map(menu => ({ id: menu.id, categoryId: menu.categoryId, name: menu.name }))
}

onMounted(async () => {
  await onLoadedGym().then(async () => {
    await whereTrainingCategory({ gymId: gym.value?.id  })
    await whereTrainingMenu({ gymId: gym.value?.id  })
    const category = trainingCategories.value[0]
    selectedCategory.value = { id: category.id, name: category.name }
    setMenu()
  })
})
</script>
