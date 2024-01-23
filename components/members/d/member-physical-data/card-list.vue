<template>
  <v-row
    v-show="compare"
  >
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
        @click=""
      >
        <v-card-title class="justify-center text-center" style="height: 4vw;">
          <common-underlined-text
            :text="numSetting.name"
            class="text-body-2 mb-4 font-weight-bold"
          />
        </v-card-title>

        <v-card-text style="height: 10vw">
          <v-row no-gutters align="center" style="height: 100%">
            <v-col cols="12" class="text-center pt-3 pb-0">
              <div class="text-center text-h4 text-green1 font-weight-bold">
                {{ currentValInfo(numSetting.key) }}
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
    <!-- <v-col
      v-for="numValue in physicalNumValues[0].detail."
      :key="numValue.id"
      cols="6"
      sm="4"
    >
      <v-card
        variant="elevated"
        height="100%"
        rounded="lg"
        @click=""
      >
        <v-card-title class="justify-center " style="height: 20%;">
          <div class="test text-body-2 font-weight-bold">{{ label.label }}</div>
        </v-card-title>

        <v-card-text style="height: 80%">
          <v-row no-gutters align="center" style="height: 100%">
            <v-col cols="12" class="text-center pt-3 pb-0">
              <div class="text-center text-h4 main--text font-weight-bold">{{ compareData[2] && compareData[2][label.key] }}</div>
            </v-col>

            <v-col cols="5" class="text-center">
              <div class="text-body-1 font-weight-bold" style="line-height: 1.25rem;">{{ compareData[0] && compareData[0][label.key] }}</div>
            </v-col>

            <v-col cols="2" class="text-center text-body-2">
              <v-icon small>mdi-arrow-right</v-icon>
            </v-col>

            <v-col cols="5" class="text-center text-body-2">
              <div class="text-body-1 font-weight-bold" style="line-height: 1.25rem;">{{ compareData[1] && compareData[1][label.key] }}</div>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col> -->
  </v-row>

  <v-card
    v-show="!compare"
    variant="flat"
    rounded="lg"
    class="mb-4"
  >
    <v-card-title>
      <common-underlined-text
        text="初回/前回/今回"
        class="text-body-2 mb-4 font-weight-bold"
      />
    </v-card-title>

    <v-card-text
      class="kt-table"
      style="overflow-x: scroll;"
    >
      <v-row
        class="text-caption font-weight-bold flex-nowrap"
      >
        <v-col
          style="width: 90px;"
          class="text-center"
          cols="auto"
        >
          計測日
        </v-col>

        <v-col
          v-for="numSetting, i in physicalNumValueSettings"
          :key="`${i}-${numSetting.id}`"
          :style="`width: ${numSetting.width}px;`"
          class="text-center"
          cols="auto"
        >
          {{ numSetting.name }}
        </v-col>
      </v-row>

      <v-row
        v-for="numValue, i in values"
        :key="`${i}-${numValue.id}`"
        class="flex-nowrap"
      >
        <v-col
          style="width: 90px;"
          class="text-center"
          cols="auto"
        >
          {{ yymmdd(numValue.dateKey) }}
        </v-col>

        <v-col
          v-for="numSetting, i in physicalNumValueSettings"
          :key="`${i}-${numSetting.id}`"
          :style="`width: ${numSetting.width}px;`"
          class="text-center"
          cols="auto"
        >
          {{ numValue.detail && numValue.detail[numSetting.key] }}
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-card
    v-show="!compare"
    variant="flat"
    rounded="lg"
  >
    <v-card-title>
      <common-underlined-text
        text="一覧"
        class="text-body-2 mb-4 font-weight-bold"
      />
    </v-card-title>

    <v-card-text
      class="kt-table"
      style="overflow-x: scroll;"
    >
      <v-row
        class="text-caption font-weight-bold flex-nowrap"
      >
        <v-col
          style="width: 90px;"
          class="text-center"
          cols="auto"
        >
          計測日
        </v-col>

        <v-col
          v-for="numSetting, i in physicalNumValueSettings"
          :key="`${i}-${numSetting.id}`"
          :style="`width: ${numSetting.width}px;`"
          class="text-center"
          cols="auto"
        >
          {{ numSetting.name }}
        </v-col>
      </v-row>

      <v-row
        v-for="numValue, i in physicalNumValues"
        :key="`${i}-${numValue.id}`"
        class="flex-nowrap"
      >
        <v-col
          style="width: 90px;"
          class="text-center"
          cols="auto"
        >
          {{ yymmdd(numValue.dateKey) }}
        </v-col>

        <v-col
          v-for="numSetting, i in physicalNumValueSettings"
          :key="`${i}-${numSetting.id}`"
          :style="`width: ${numSetting.width}px;`"
          class="text-center"
          cols="auto"
        >
          {{ numValue.detail[numSetting.key] }}
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
import { DocumentData } from "firebase/firestore";

const { physicalNumValues, physicalNumValueSettings, onLoadedPhysicalData } = inject(PhysicalDataKey) as PhysicalDataType
const { currentDate, beforeDate, afterDate, compare } = inject(DateSelectorKey) as DateSelectorType

const firstVal: Ref<any> = ref({})
const lastVal: Ref<any> = ref({})
const latestVal: Ref<any> = ref({})
const values: Ref<any> = ref([])

const currentVal: Ref<DocumentData> = ref({})
const currentValInfo = (key: string) => {
  if (Object.keys(currentVal.value).length) {
    return currentVal.value.detail[key]
  } else {
    return ''
  }
}

const compareVal: Ref<any> = ref({})
const compareValInfo = (key: string) => {
  if (Object.keys(compareVal.value).length) {
    return compareVal.value.detail[key]
  } else {
    return ''
  }
}

const setCompareVal = () => {
  const beforeVal = physicalNumValues.value.find((v: any) => v.dateKey === beforeDate.value.value) || {}
  const afterVal = physicalNumValues.value.find((v: any) => v.dateKey === afterDate.value.value) || {}

  compareVal.value['detail'] = {
    'weight': afterVal.detail['weight'] - beforeVal.detail['weight'],
    'fat': afterVal.detail['fat'] - beforeVal.detail['fat'],
    'bodyAge': afterVal.detail['bodyAge'] - beforeVal.detail['bodyAge'],
    'bmi': afterVal.detail['bmi'] - beforeVal.detail['bmi'],
    'metabolism': afterVal.detail['metabolism'] - beforeVal.detail['metabolism'],
    'visceral': afterVal.detail['visceral'] - beforeVal.detail['visceral'],
  }
}

const yymmdd = (key: string) => {
  return key?.slice(2)
}

watch(
  () => currentDate.value,
  () => {
    currentVal.value = physicalNumValues.value.find((v: any) => v.dateKey === currentDate.value.value) || {}
  }
)

watch(
  () => [beforeDate.value, afterDate.value],
  () => {
    setCompareVal()
  }
)

watchEffect(() => {
  firstVal.value = physicalNumValues.value[0] || {}
  lastVal.value = physicalNumValues.value.at(-2) || {}
  latestVal.value = physicalNumValues.value.at(-1) || {}
  values.value = [firstVal.value, lastVal.value, latestVal.value]
})
</script>

<style scoped>
.kt-table::-webkit-scrollbar {
  display: none;
}
</style>
