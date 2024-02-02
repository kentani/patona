<template>
  <v-card
    v-show="!compare"
    variant="flat"
    rounded="lg"
  >
    <v-card-title>
      <v-row
        dense
      >
        <v-col
          cols="auto"
        >
          <common-underlined-text
            text="一覧"
            class="text-body-2 mb-4 font-weight-bold"
          />
        </v-col>

        <v-spacer />

        <v-col
          cols="auto"
          align-self="center"
        >
          <members-d-member-physical-data-add-btn />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text
      class="kt-table"
      style="overflow-x: scroll;"
    >
      <v-row
        class="text-caption font-weight-bold flex-nowrap px-0 mx-0 "
        style=""
      >
        <v-col
          style="width: 120px; border-bottom: 1px solid #ddd;"
          class="text-center"
          cols="auto"
        >
          計測日
        </v-col>

        <v-col
          v-for="numSetting, i in physicalNumValueSettings"
          :key="`${i}-${numSetting.id}`"
          :style="`width: ${numSetting.width}px; border-bottom: 1px solid #ddd;`"
          class="text-center"
          cols="auto"
        >
          {{ numSetting.name }}
        </v-col>
      </v-row>

      <v-row
        v-for="numValue, i in physicalNumValues"
        :key="`${i}-${numValue.id}`"
        class="flex-nowrap px-0 mx-0 on-hover"
        @click="onClickNumValue(numValue)"
      >
        <v-col
          style="width: 120px; border-bottom: 1px solid #ddd;"
          class="text-center"
          cols="auto"
        >
          {{ numValue.dateKey }}
        </v-col>

        <v-col
          v-for="numSetting, i in physicalNumValueSettings"
          :key="`${i}-${numSetting.id}`"
          :style="`width: ${numSetting.width}px; border-bottom: 1px solid #ddd;`"
          class="text-center"
          cols="auto"
        >
          {{ numValue.detail[numSetting.key] }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-card
    v-show="compare"
    variant="flat"
    rounded="lg"
  >
    <v-card-title>
      <common-underlined-text
        text="比較"
        class="text-body-2 mb-4 font-weight-bold"
      />
    </v-card-title>

    <v-card-text
      class="kt-table"
      style="overflow-x: scroll;"
    >
      <v-row>
        <v-col
          v-for="numSetting in physicalNumValueSettings"
          :key="`1-${numSetting.id}`"
          cols="6"
          sm="4"
        >
          <v-card
            variant="elevated"
            height="100%"
            rounded="lg"
            @click="onClickCompareCard(numSetting)"
          >
            <v-card-title class="justify-center text-center" style="height: 50px;">
              <common-underlined-text
                :text="numSetting.name"
                class="text-body-2 mb-4 font-weight-bold"
              />
            </v-card-title>

            <v-card-text style="height: 120px">
              <v-row no-gutters align="center" style="height: 100%">
                <v-col cols="12" class="text-center">
                  <div class="text-center text-h4 text-green1 font-weight-bold">{{ compareValInfo(numSetting.key) }}</div>
                  <!-- <div class="text-caption" style="line-height: 0.5rem;">{{ numSetting.suffix }}</div> -->
                </v-col>

                <v-col cols="5" class="text-center">
                  <div class="text-body-2 font-weight-bold" style="line-height: 1.25rem;">{{ beforeValInfo(numSetting.key) }}</div>
                  <!-- <div class="text-caption" style="line-height: 0.5rem;">{{ numSetting.suffix }}</div> -->
                </v-col>

                <v-col cols="2" class="text-center text-body-2">
                  <v-icon small>mdi-arrow-right</v-icon>
                </v-col>

                <v-col cols="5" class="text-center text-body-2">
                  <div class="text-body-2 font-weight-bold" style="line-height: 1.25rem;">{{ afterValInfo(numSetting.key) }}</div>
                  <!-- <div class="text-caption" style="line-height: 0.5rem;">{{ numSetting.suffix }}</div> -->
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12">
          <members-d-member-physical-data-chart />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <members-d-member-physical-data-form
    ref="physicalDataForm"
  />
</template>

<script setup lang="ts">
import { PhysicalDataType } from "@/composables/physical-data/physical-data"
import PhysicalDataKey from "@/composables/physical-data/physical-data-key"
import { DateSelectorType } from "@/composables/physical-data/date-selector/date-selector"
import DateSelectorKey from "@/composables/physical-data/date-selector/date-selector-key"

const { physicalNumValues, physicalNumValueSettings, onLoadedPhysicalData, setPhysicalNumValue, setCurrentSetting } = inject(PhysicalDataKey) as PhysicalDataType
const { compare, beforeDate, afterDate, setBeforeDate, setAfterDate } = inject(DateSelectorKey) as DateSelectorType

const physicalDataForm = ref()
const beforeVal: Ref<any> = ref({})
const afterVal: Ref<any> = ref({})
const compareVal: Ref<any> = ref({})
const beforeValInfo = (key: string) => {
  if (Object.keys(beforeVal.value).length) {
    return beforeVal.value.detail[key]
  } else {
    return ''
  }
}
const afterValInfo = (key: string) => {
  if (Object.keys(afterVal.value).length) {
    return afterVal.value.detail[key]
  } else {
    return ''
  }
}
const compareValInfo = (key: string) => {
  if (Object.keys(compareVal.value).length) {
    return compareVal.value.detail[key].toLocaleString( undefined, { maximumFractionDigits: [1] })
  } else {
    return ''
  }
}

const setCompareVal = () => {
  const defaultVal = {
    detail: {
      weight: 0,
      fat: 0,
      bodyAge: 0,
      bmi: 0,
      metabolism: 0,
      visceral: 0,
    }
  }

  beforeVal.value = physicalNumValues.value.find((v: any) => v.dateKey === beforeDate.value) || defaultVal
  afterVal.value = physicalNumValues.value.find((v: any) => v.dateKey === afterDate.value) || defaultVal

  compareVal.value['detail'] = {
    'weight': afterVal.value.detail['weight'] - beforeVal.value.detail['weight'],
    'fat': afterVal.value.detail['fat'] - beforeVal.value.detail['fat'],
    'bodyAge': afterVal.value.detail['bodyAge'] - beforeVal.value.detail['bodyAge'],
    'bmi': afterVal.value.detail['bmi'] - beforeVal.value.detail['bmi'],
    'metabolism': afterVal.value.detail['metabolism'] - beforeVal.value.detail['metabolism'],
    'visceral': afterVal.value.detail['visceral'] - beforeVal.value.detail['visceral'],
  }
}

const onClickNumValue = (numValue: any) => {
  setPhysicalNumValue(numValue)
  physicalDataForm.value.open({ isEdit: true })
}

const onClickCompareCard = (setting: any) => {
  setCurrentSetting(setting)
}

watch(
  () => [beforeDate.value, afterDate.value],
  () => {
    setCompareVal()
  }
)

onMounted(async () => {
  await onLoadedPhysicalData().then(async () => {
    setCompareVal()
    setCurrentSetting(physicalNumValueSettings.value[0])
  })
})
</script>

<style scoped>
.kt-table::-webkit-scrollbar {
  display: none;
}

.on-hover {
  cursor: pointer;
}

.on-hover:hover {
  opacity: 0.6;
  /* box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px; */
}
</style>
