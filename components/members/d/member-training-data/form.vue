<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    :fullscreen="$vuetify.display.xs"
    scrollable
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
          :text="isEdit ? 'トレーニング履歴を編集' : 'トレーニング履歴を追加'"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            cols="12"
          >
            <common-underlined-text
              text="日付"
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
            <members-d-member-training-data-calender />
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="trainingDateKey"
              label="日付"
              placeholder="例）19910212"
              variant="outlined"
              color="green1"
              type="tel"
              :rules="[rules.required, rules.counter, rules.date]"
              density="compact"
              validate-on="blur"
              @update:focused="onUpdateFocusedTrainingDate"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <common-underlined-text
              text="メニュー"
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
              variant="outlined"
              :items="trainingCategories"
              item-title="name"
              item-value="id"
              label="カテゴリー"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              return-object
              @update:modelValue="onUpdateCategory"
            ></v-select>
          </v-col>

          <v-col
            cols="12"
          >
            <v-select
              v-model="selectedMenuModel"
              variant="outlined"
              :items="currentMenus"
              item-title="name"
              item-value="id"
              label="メニュー"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              return-object
              @update:modelValue=""
            ></v-select>
          </v-col>

          <v-col
            cols="12"
          >
            <common-underlined-text
              text="内容"
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
            <v-slider
              v-model="set"
              label="セット数"
              :min="1"
              :max="5"
              :step="1"
              color="green1"
              density="compact"
              hide-details
              @update:modelValue="onChangeSet"
            >
              <template v-slot:append>
                <v-text-field
                  v-model="set"
                  type="tel"
                  style="width: 80px"
                  color="green1"
                  density="compact"
                  hide-details
                  variant="outlined"
                  :rules="[rules.set]"
                  @update:modelValue="onChangeSet"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>

          <v-col
            v-for="(_w, index) in weight"
            :key="index"
            cols="12"
          >
            <v-slider
              v-model="weight[index]"
              :min="0"
              :max="100"
              :step="1"
              color="green1"
              :label="`${index + 1}セット目の重量`"
              density="compact"
              hide-details
            >
              <template v-slot:append>
                <v-text-field
                  v-model="weight[index]"
                  type="tel"
                  style="width: 80px"
                  color="green1"
                  density="compact"
                  hide-details
                  variant="outlined"
                ></v-text-field>
              </template>
            </v-slider>

            <v-slider
              v-model="count[index]"
              :min="0"
              :max="100"
              :step="1"
              color="green1"
              :label="`${index + 1}セット目の回数`"
              density="compact"
              hide-details
            >
              <template v-slot:append>
                <v-text-field
                  v-model="count[index]"
                  type="tel"
                  style="width: 80px"
                  color="green1"
                  density="compact"
                  hide-details
                  variant="outlined"
                ></v-text-field>
              </template>
            </v-slider>
          </v-col>

          <v-col
            cols="12"
          >
            <common-underlined-text
              text="その他"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-error font-weight-bold"
            >
              ※任意
            </span>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memo"
              label="メモ"
              variant="outlined"
              color="green1"
              type="tel"
              density="compact"
              validate-on="blur"
            ></v-textarea>
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
import { format } from 'date-fns'

import { CalenderType } from "@/composables/training/calender/calender"
import CalenderKey from "@/composables/training/calender/calender-key"
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"
import { TrainingType } from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"

const {
  currentDate,
  selectedDate,
  setSelectedDate,
  setCurrentDateKey,
  setCurrentDateByDateKey,
  setCurrentYearMonth,
  setCurrentYearMonthDate
} = inject(CalenderKey) as CalenderType
const { trainingCategories, selectedCategory, setSelectedCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { trainingMenus } = inject(TrainingMenuKey) as TrainingMenuType
const { currentTraining, whereTraining, createTraining, updateTraining } = inject(TrainingKey) as TrainingType

const route = useRoute()

const dialog = ref(false)
const selectedCategoryModel: Ref<any> = ref({ id: '0', name: '' })
const selectedMenuModel: Ref<any> = ref({ id: '0', categoryId: '0', name: '' })
const currentMenus = ref([{ id: '0', categoryId: '0', name: '' }])
const trainingDateKey = ref('')
const set = ref(1)
const weight = ref([0])
const count = ref([0])
const memo = ref('')
const isEdit = ref(false)

const rules = ref({
  required: (value: any) => isRequired(value) || '必須項目です',
  counter: (value: any) => value.length === 8 || '入力形式が不正です （例）19910212',
  date: (value: any) => isValidDate(value) || '入力形式が不正です （例）19910212',
  set: (value: any) => (1 <= Number(value) && Number(value) <= 5) || '1~5の間で設定してください',
})

const isRequired = (value: any) => {
  if(!value) return false

  if(Array.isArray(value)) return !!value.length

  if(typeof value === 'object') return !!Object.keys(value).length

  return !!value.length
}

const isValidDate = (value: any) => {
  if(!value) return true

  const dateString = `${value.slice(0, 4)}/${value.slice(4, 6)}/${value.slice(6, 8)}`
  const day =  new Date(dateString)

  return !Number.isNaN(day.getTime())
}

const setMenu = () => {
  let tmpMenus = trainingMenus.value.filter(menu => menu.categoryId === selectedCategory.value?.id)
  currentMenus.value = tmpMenus.map(menu => ({ id: menu.id, categoryId: menu.categoryId, name: menu.name }))
}

const onUpdateFocusedTrainingDate = () => {
  if(isValidDate(trainingDateKey.value)) {
    const year = trainingDateKey.value.slice(0, 4)
    const month = trainingDateKey.value.slice(4, 6)
    const date = trainingDateKey.value.slice(6, 8)

    setCurrentDateKey(trainingDateKey.value)
    setCurrentDateByDateKey(`${year}/${month}/${date}`)
    setSelectedDate(Number(date))
    setCurrentYearMonth()
    setCurrentYearMonthDate()
  }
}

const onUpdateCategory = () => {
  setSelectedCategory(selectedCategoryModel.value)
  setMenu()
}

const onChangeSet = () => {
  weight.value = new Array(Number(set.value))
  for (let key of weight.value.keys()) {
    weight.value[key] = 0
  }

  count.value = new Array(Number(set.value))
  for (let key of count.value.keys()) {
    count.value[key] = 0
  }
}

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  if(isEdit.value) {
    await updateTraining(currentTraining.value.id, {
      categoryId: selectedCategoryModel.value?.id,
      menuId: selectedMenuModel.value?.id,
      dateKey: trainingDateKey.value,
      detail: {
        set: set.value,
        kg: weight.value || [0],
        count: count.value || [0],
        memo: memo.value
      }
    })
  } else {
    await createTraining({
      gymId: String(route.query.gymId),
      memberId: String(route.query.memberId),
      categoryId: selectedCategoryModel.value?.id,
      menuId: selectedMenuModel.value?.id,
      dateKey: trainingDateKey.value,
      detail: {
        set: set.value,
        kg: weight.value || [0],
        count: count.value || [0],
        memo: memo.value
      }
    })
  }

  whereTraining({ gymId: String(route.query.gymId), memberId: String(route.query.memberId) })

  close()
}

const open = (params: { isEdit: boolean }) => {
  isEdit.value = params.isEdit

  if (isEdit.value) {
    const category = trainingCategories.value.find(c => c.id === currentTraining.value.categoryId)
    const menu = trainingMenus.value.find(m => m.id === currentTraining.value.menuId)
    setSelectedCategory(category)
    setMenu()
    selectedMenuModel.value = menu
    set.value = currentTraining.value.detail.set
    weight.value = currentTraining.value.detail.kg || [0]
    count.value = currentTraining.value.detail.count || [0]
    memo.value = currentTraining.value.detail.memo
  } else {
    setSelectedCategory(trainingCategories.value[0])
    setMenu()
    set.value = 1
    weight.value = [0]
    count.value = [0]
    memo.value = ''
  }

  dialog.value = true
}

const close = () => {
  setSelectedCategory(trainingCategories.value[0])
  setMenu()
  set.value = 1
  weight.value = [0]
  count.value = [0]
  memo.value = ''
  dialog.value = false
}

watchEffect(() => {
  selectedCategoryModel.value = selectedCategory.value
  currentMenus.value = trainingMenus.value.filter(m => m.categoryId === selectedCategory.value?.id).map(m => ({ id: m.id, categoryId: m.categoryId, name: m.name }))
  selectedMenuModel.value = currentMenus.value[0]
  trainingDateKey.value = format(new Date(`${format(currentDate.value, 'yyyy/MM/')}${selectedDate.value}`), 'yyyyMMdd')
})

defineExpose({
  open,
})
</script>
