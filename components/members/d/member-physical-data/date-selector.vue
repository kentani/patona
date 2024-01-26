<template>
  <v-card
    variant="flat"
    rounded="lg"
    class="text-font"
  >
    <v-card-title>
      <v-row
        dense
      >
        <v-col
          cols="auto"
        >
          <span class="text-body-1 text-grey">計測数</span>
          <span class="mx-2 text-h4 font-weight-bold text-green1">{{ physicalNumValues.length }}</span>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text>
      <v-row
        dense
      >
        <v-col
          cols="12"
        >
          <common-underlined-text
            text="表示オプション"
            class="text-body-2 my-2"
          />
        </v-col>

        <v-col
          cols="6"
          sm="12"
        >
          <v-switch
            v-model="compareModel"
            label="比較する"
            density="compact"
            color="green1"
            inset
            hide-details
            :disabled="compareDisabled"
            @update:modelValue="onChangeCompare"
          ></v-switch>
        </v-col>

        <v-col
          cols="12"
        >
          <v-select
            v-model="beforeDateModel"
            :items="beforeDateSelectOption"
            item-title="title"
            item-value="value"
            color="green1"
            item-color="green1"
            variant="solo"
            density="compact"
            hide-details
            :disabled="beforeDateDisabled"
            @update:modelValue="onChangeDate"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :disabled="item.raw.disabled"
              ></v-list-item>
            </template>
          </v-select>
        </v-col>

        <v-col
          cols="12"
          class="text-center"
        >
          <v-icon class="py-4">mdi-compare-vertical</v-icon>
        </v-col>

        <v-col
          cols="12"
        >
          <v-select
            v-model="afterDateModel"
            :items="afterDateSelectOption"
            item-title="title"
            item-value="value"
            color="green1"
            item-color="green1"
            variant="solo"
            density="compact"
            hide-details
            :disabled="afterDateDisabled"
            @update:modelValue="onChangeDate"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :disabled="item.raw.disabled"
              ></v-list-item>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { PhysicalDataType } from "@/composables/physical-data/physical-data"
import PhysicalDataKey from "@/composables/physical-data/physical-data-key"
import { DateSelectorType } from "@/composables/physical-data/date-selector/date-selector"
import DateSelectorKey from "@/composables/physical-data/date-selector/date-selector-key"

const { physicalNumValues, onLoadedPhysicalData } = inject(PhysicalDataKey) as PhysicalDataType
const { compare, setCompare, setBeforeDate, setAfterDate } = inject(DateSelectorKey) as DateSelectorType

const compareModel: Ref<any> = ref(false)
const beforeDateModel: Ref<any> = ref(null)
const afterDateModel: Ref<any> = ref(null)
const beforeDateSelectOption: Ref<any> = ref([])
const afterDateSelectOption: Ref<any> = ref([])

const compareDisabled = computed(() => {
  return physicalNumValues.value.length < 2
})
const beforeDateDisabled = computed(() => {
  return !compareModel.value || physicalNumValues.value.length < 2
})
const afterDateDisabled = computed(() => {
  return !compareModel.value || physicalNumValues.value.length < 2
})

const buildBeforeDateSelectOption = () => {
  beforeDateSelectOption.value =  physicalNumValues.value.map(val => {
    let dateKey = val.dateKey

    return {
      title: `${dateKey.slice(0, 4)}-${dateKey.slice(4, 6)}-${dateKey.slice(6, 8)}`,
      value: dateKey,
      disabled: afterDateModel.value < dateKey,
    }
  })
}
const buildAfterDateSelectOption = () => {
  afterDateSelectOption.value = physicalNumValues.value.map(val => {
    let dateKey = val.dateKey

    return {
      title: `${dateKey.slice(0, 4)}-${dateKey.slice(4, 6)}-${dateKey.slice(6, 8)}`,
      value: dateKey,
      disabled: beforeDateModel.value > dateKey,
    }
  })
}

const onChangeCompare = () => {
  setCompare(compareModel.value)
}
const onChangeDate = () => {
  setBeforeDate(beforeDateModel.value)
  setAfterDate(afterDateModel.value)
  buildBeforeDateSelectOption()
  buildAfterDateSelectOption()
}

watch(
  () => physicalNumValues.value,
  () => {
    beforeDateModel.value = physicalNumValues.value[0].dateKey
    afterDateModel.value = physicalNumValues.value.slice(-1)[0].dateKey
    setBeforeDate(beforeDateModel.value)
    setAfterDate(afterDateModel.value)
    buildBeforeDateSelectOption()
    buildAfterDateSelectOption()
  }
)

watchEffect(async () => {
  await onLoadedPhysicalData().then(async () => {
    compareModel.value = compare.value
    beforeDateModel.value = physicalNumValues.value[0].dateKey
    afterDateModel.value = physicalNumValues.value.slice(-1)[0].dateKey
    setBeforeDate(beforeDateModel.value)
    setAfterDate(afterDateModel.value)
    buildBeforeDateSelectOption()
    buildAfterDateSelectOption()
  })
})

onMounted(async () => {
  await onLoadedPhysicalData().then(async () => {
    compareModel.value = compare.value
    beforeDateModel.value = physicalNumValues.value[0].dateKey
    afterDateModel.value = physicalNumValues.value.slice(-1)[0].dateKey
    setBeforeDate(beforeDateModel.value)
    setAfterDate(afterDateModel.value)
    buildBeforeDateSelectOption()
    buildAfterDateSelectOption()
  })
})
</script>
