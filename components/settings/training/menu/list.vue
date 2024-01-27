<template>
  <v-row
    dense
  >
    <v-col
      v-for="menu in currentMenus"
      :key="menu.id"
      cols="auto"
    >
      <v-btn
        variant="outlined"
        color="green1"
        rounded="lg"
        @click="onClickMenu(menu)"
      >
        {{ menu.name }}
      </v-btn>
    </v-col>
  </v-row>

  <settings-training-menu-form
    ref="menuForm"
  />
</template>

<script setup lang="ts">
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"

const { selectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { trainingMenus } = inject(TrainingMenuKey) as TrainingMenuType

const menuForm = ref()
const currentMenus = ref([{ id: '0', categoryId: '0', name: '' }])

const setMenu = () => {
  let tmpMenus = trainingMenus.value.filter(menu => menu.categoryId === selectedCategory.value?.id)
  currentMenus.value = tmpMenus.map(menu => ({ id: menu.id, categoryId: menu.categoryId, name: menu.name }))
}

const onClickMenu = (menu: any) => {
  menuForm.value.open(menu)
}

watchEffect(() => {
  currentMenus.value = trainingMenus.value.filter(m => m.categoryId === selectedCategory.value?.id).map(m => ({ id: m.id, categoryId: m.categoryId, name: m.name }))
})

defineExpose({
  setMenu,
})
</script>
