<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-title class="px-0 pt-3 pb-0 text-brown1">
      <v-row
        dense
        justify="center"
        align="center"
      >
        <v-col
          cols="2"
          class="d-flex justify-center"
          align-self="center"
        >
          <v-btn
            id="prev-month-btn"
            class="px-0"
            style="min-width: 0px;"
            variant="text"
            :ripple="false"
            size="large"
            color="green1"
            rounded="lg"
            @click="onClickPrevMonth"
          >
            <v-icon
              size="x-large"
            >
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="6"
          class="d-flex justify-center"
          align-self="center"
        >
          <div
            class="text-body-1 font-weight-bold text-font"
          >
            {{ currentYearMonth }}
          </div>
        </v-col>

        <v-col
          cols="2"
          class="d-flex justify-center"
          align-self="center"
        >
          <v-btn
            id="next-month-btn"
            class="px-0"
            style="min-width: 0px;"
            variant="text"
            :ripple="false"
            size="large"
            color="green1"
            rounded="lg"
            @click="onClickNextMonth"
          >
            <v-icon
              size="x-large"
            >
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text
      class="pa-2 pt-0"
    >
      <div
        class="d-flex py-2"
      >
        <div
          v-for="(day, index) in week"
          :key="day"
          class="text-center text-caption"
          :class="weekClass(index)"
          style="width: 14.2%;"
        >
          {{ day }}
        </div>
      </div>

      <div
        v-for="(week, index) in dateList"
        :key="`week-${index}`"
        class="d-flex py-2"
      >
        <v-btn
          v-for="date in week"
          :key="date"
          class="text-center"
          :class="dateClass(date)"
          style="width: 14.2%; min-width: 0px;"
          :style="dateStyle(date)"
          variant="text"
          size="small"
          elevation="0"
          rounded="lg"
          :ripple="false"
          :disabled="!date"
          @click="onClickDate(date)"
        >
          <span
            class="text-body-2"
          >
            {{ date }}
          </span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { CalenderType } from "@/composables/training/calender/calender"
import CalenderKey from "@/composables/training/calender/calender-key"

const {
  selectedDate,
  currentYearMonth,
  week,
  dateList,
  setCurrentDate,
  setCurrentDateKey,
  setSelectedDate,
  setCurrentYearMonth,
  setCurrentYearMonthDate,
  setDateList,
  prevMonth,
  nextMonth,
  isToday,
} = inject(CalenderKey) as CalenderType

const onClickPrevMonth = () => {
  prevMonth()
}

const onClickNextMonth = () => {
  nextMonth()
}

const onClickDate = (date: Number|null) => {
  if(!date) return

  setCurrentDate(date)
  setSelectedDate(date)
  setCurrentYearMonth()
  setCurrentYearMonthDate()
}

const weekClass = (index: any) => {
  let klass = 'text-font'

  if(index === 5) {
    klass = 'text-blue'
  } else if(index === 6) {
    klass = 'text-error'
  }

  return klass
}

const dateClass = (date: Number)  => {
  let klass = 'text-grey'

  if(date === selectedDate.value) {
    klass = 'font-weight-bold text-green1'
  }

  if(isToday(date)) {
    klass = 'text-white'
  }

  return klass
}

const dateStyle = (date: Number) => {
  let style = ''

  if(date === selectedDate.value) {
    style = 'border: 1px solid rgb(var(--v-theme-green1));'
  }

  if(isToday(date)) {
    style = 'background: rgb(var(--v-theme-green1));'
  }

  return style
}

onMounted(() => {
  setCurrentYearMonth()
  setCurrentYearMonthDate()
  setDateList()
})
</script>
