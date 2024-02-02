<template>
  <div>
    <div v-if="loaded" class="line">
      <Line
        :data="data"
        :options="options"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, PointElement, LineElement, Tooltip, Title, Legend, CategoryScale, LinearScale } from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(ArcElement, PointElement, LineElement, Tooltip, Title, Legend, CategoryScale, LinearScale)

import { PhysicalDataType } from "@/composables/physical-data/physical-data"
import PhysicalDataKey from "@/composables/physical-data/physical-data-key"
import { DateSelectorType } from "@/composables/physical-data/date-selector/date-selector"
import DateSelectorKey from "@/composables/physical-data/date-selector/date-selector-key"

const { physicalNumValues, physicalNumValueSettings, currentSetting, onLoadedPhysicalData, setCurrentSetting } = inject(PhysicalDataKey) as PhysicalDataType
const { beforeDate, afterDate, setBeforeDate, setAfterDate } = inject(DateSelectorKey) as DateSelectorType

const loaded: Ref<Boolean> = ref(false)
const data: Ref<any> = ref({})
const options: Ref<any> = ref({})



watch(
  () => [beforeDate.value, afterDate.value, physicalNumValues.value, currentSetting.value],
  () => {
    const values = physicalNumValues.value.filter(v => (beforeDate.value <= v.dateKey && v.dateKey <= afterDate.value))
    data.value = {
      labels: values.map(v => v.dateKey),
      datasets: [{
        label: currentSetting.value?.name,
        backgroundColor: 'rgb(232, 234, 246, 0.1)',
        borderColor: "#006666",
        data: values.map(v => v.detail[currentSetting.value?.key]),
      }]
    }

    options.value = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          ticks: {
            color: "#004D40",
          },
          grid: {
            color: "rgb(232, 234, 246, 0.1)"
          },
        },
        x: {
          ticks: {
            color: "#004D40",
          },
          grid: {
            color: "rgb(232, 234, 246, 0.1)"
          }
        }
      }
    }
  }
)

onMounted(async () => {
  await onLoadedPhysicalData().then(async () => {
    setBeforeDate(physicalNumValues.value[0]?.dateKey)
    setAfterDate(physicalNumValues.value.slice(-1)[0]?.dateKey)
    setCurrentSetting(physicalNumValueSettings.value[0])

    data.value = {
      labels: physicalNumValues.value.map(v => v.dateKey),
      datasets: [{
        label: physicalNumValueSettings.value[0]?.name,
        backgroundColor: 'rgb(232, 234, 246, 0.1)',
        borderColor: "#006666",
        data: physicalNumValues.value?.map(v => v.detail[physicalNumValueSettings.value[0].key]?.toLocaleString( undefined, { maximumFractionDigits: [1] })),
        fill: true,
      }]
    }

    options.value = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          stacked: true,
          ticks: {
            color: "#004D40",
          },
          grid: {
            color: "rgb(232, 234, 246, 0.1)"
          },
        },
        x: {
          ticks: {
            color: "#004D40",
          },
          grid: {
            color: "rgb(232, 234, 246, 0.1)"
          }
        }
      }
    }
  })

  loaded.value = true
})
</script>

<style>
.line {
  min-height: 400px;
}
</style>
