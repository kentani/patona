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
          :text="isEdit ? '身体数値を編集' : '身体数値を追加'"
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
              v-model="dateKey"
              label="日付"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required, rules.counter, rules.date]"
              density="compact"
              validate-on="blur"
              @update:focused="onUpdateFocusedDate"
            ></v-text-field>
          </v-col>

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
              v-model="weight"
              label="体重"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="fat"
              label="体脂肪率"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="bodyAge"
              label="身体年齢"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="bmi"
              label="BMI"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="metabolism"
              label="基礎代謝量"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="visceral"
              label="内臓脂肪レベル"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            v-for="(setting, index) in physicalNumValueSettings"
            :key="setting.id"
            cols="12"
          >
            <v-text-field
              v-model="numValueModels[index]"
              :label="setting.name"
              type="tel"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
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
import { format } from 'date-fns'

import { CalenderType } from "@/composables/training/calender/calender"
import CalenderKey from "@/composables/training/calender/calender-key"
import { PhysicalDataType } from "@/composables/physical-data/physical-data"
import PhysicalDataKey from "@/composables/physical-data/physical-data-key"

const {
  currentDate,
  setSelectedDate,
  setCurrentDateKey,
  setCurrentDateByDateKey,
  setCurrentYearMonth,
  setCurrentYearMonthDate
} = inject(CalenderKey) as CalenderType
const {
  physicalNumValues,
  physicalNumValueSettings,
  wherePhysicalNumValue,
  createPhysicalNumValue,
  updatePhysicalNumValue
} = inject(PhysicalDataKey) as PhysicalDataType

const route = useRoute()

const isEdit = ref(false)
const dialog = ref(false)
const dateKey: Ref<any> = ref('')
const weight: Ref<any> = ref(null)
const fat: Ref<any> = ref(null)
const bodyAge: Ref<any> = ref(null)
const bmi: Ref<any> = ref(null)
const metabolism: Ref<any> = ref(null)
const visceral: Ref<any> = ref(null)
const numValueModels: Ref<any> = ref(new Array(physicalNumValueSettings.value.length))

const rules = ref({
  required: (value: any) => isRequired(value) || '必須項目です',
  counter: (value: any) => value.length === 8 || '入力形式が不正です （例）19910212',
  date: (value: any) => isValidDate(value) || '入力形式が不正です （例）19910212',
})
const isRequired = (value: any) => {
  if(!value) return false

  if(Array.isArray(value)) return !!value.length

  if(typeof value === 'object') return !!Object.keys(value).length

  return !!value.length
}

const isValidDate = (value: any) => {
  if(!value) return true

  const dateString = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
  const day =  new Date(dateString)

  return !Number.isNaN(day.getTime())
}

const onUpdateFocusedDate = () => {
  if(isValidDate(dateKey.value)) {
    const year = dateKey.value.slice(0, 4)
    const month = dateKey.value.slice(4, 6)
    const date = dateKey.value.slice(6, 8)

    setCurrentDateKey(dateKey.value)
    setCurrentDateByDateKey(`${year}-${month}-${date}`)
    setSelectedDate(Number(date))
    setCurrentYearMonth()
    setCurrentYearMonthDate()
  }
}

const onClickCancel = () => {
  close()
}

const onClickComplete = async () => {
  if(isEdit.value) {

  } else {
    await createPhysicalNumValue({
      gymId: String(route.query.gymId),
      memberId: String(route.query.memberId),
      dateKey: dateKey.value,
      detail: {
        weight: Number(weight.value),
        fat: Number(fat.value),
        bodyAge: Number(bodyAge.value),
        bmi: Number(bmi.value),
        metabolism: Number(metabolism.value),
        visceral: Number(visceral.value),
      }
    })
  }

  await wherePhysicalNumValue({
    gymId: String(route.query.gymId),
    memberId: String(route.query.memberId),
  })

  close()
}

const open = (params: { isEdit: boolean }) => {
  isEdit.value = params.isEdit
  dialog.value = true
}

const close = () => {
  weight.value = null
  fat.value = null
  bodyAge.value = null
  bmi.value = null
  metabolism.value = null
  visceral.value = null
  dialog.value = false
}

watchEffect(() => {
  dateKey.value = format(currentDate.value, 'yyyyMMdd')
})

defineExpose({
  open,
})
</script>
