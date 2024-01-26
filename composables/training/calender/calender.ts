import {
  format,
  startOfMonth,
  endOfMonth,
  getDay,
  getDate,
  addMonths,
  subMonths,
} from 'date-fns'

const useCalender = () => {
  const today = ref(new Date())
  const currentDate = ref(today.value)
  const currentDateKey = ref(format(currentDate.value, 'yyyyMMdd'))
  const selectedDate: Ref<Number|null> = ref(getDate(currentDate.value))
  const currentYearMonth = ref('')
  const currentYearMonthDate = ref('')
  const week = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const dateList: Ref<Array<any>> = ref([])

  const setCurrentDate = (date: any) => {
    currentDate.value = new Date(`${format(currentDate.value, 'yyyy-MM-')}${date}`)
    currentDateKey.value = format(currentDate.value, 'yyyyMMdd')
  }

  const setCurrentDateByDateKey = (dateKey: string) => {
    currentDate.value = new Date(dateKey)
    currentDateKey.value = format(currentDate.value, 'yyyyMMdd')
  }

  const setSelectedDate = (date: Number) => {
    selectedDate.value = date
  }

  const setCurrentDateKey = (dateKey: string) => {
    currentDateKey.value = dateKey
  }

  const setCurrentYearMonth = () => {
    currentYearMonth.value = format(currentDate.value, 'yyyy年 MM月')
  }

  const setCurrentYearMonthDate = () => {
    currentYearMonthDate.value = format(currentDate.value, 'yyyy年 MM月 dd日')
  }

  const setDateList = () => {
    const prevMonthDateCount = getDay(startOfMonth(currentDate.value)) - 1

    dateList.value = []

    if (prevMonthDateCount > 0) {
      dateList.value = new Array(prevMonthDateCount)
    }

    const currentDateCount = getDate(endOfMonth(currentDate.value))

    for(let i = 1; i <= currentDateCount; i++) {
      dateList.value.push(i)
    }

    dateList.value = [
      dateList.value.slice(0,7),
      dateList.value.slice(7,14),
      dateList.value.slice(14,21),
      dateList.value.slice(21,28),
      dateList.value.slice(28,35),
    ]
  }

  const prevMonth = () => {
    currentDate.value = subMonths(currentDate.value, 1)
    setCurrentDateKey(format(currentDate.value, 'yyyyMMdd'))
    setCurrentYearMonth()
    setCurrentYearMonthDate()
    setDateList()
  }

  const nextMonth = () => {
    currentDate.value = addMonths(currentDate.value, 1)
    setCurrentDateKey(format(currentDate.value, 'yyyyMMdd'))
    setCurrentYearMonth()
    setCurrentYearMonthDate()
    setDateList()
  }

  const isToday = (date: Number|null) => {
    if(!date) return

    const d = new Date(`${format(currentDate.value, 'yyyy-MM-')}${date}`)

    return format(d, 'yyyyMMdd') === format(today.value, 'yyyyMMdd')
  }

  const isExistTraining = (params: { trainingDates: any, date: any }) => {
    const { trainingDates, date } = params
    if (!date) return false;
    const key = format(new Date(`${format(currentDate.value, 'yyyy-MM-')}${date}`), 'yyyyMMdd')
    return trainingDates.includes(key)
  }

  return {
    today,
    currentDate,
    currentDateKey,
    selectedDate,
    currentYearMonth,
    currentYearMonthDate,
    week,
    dateList,
    setCurrentDate,
    setCurrentDateKey,
    setSelectedDate,
    setCurrentDateByDateKey,
    setCurrentYearMonth,
    setCurrentYearMonthDate,
    setDateList,
    prevMonth,
    nextMonth,
    isToday,
    isExistTraining,
  }
}

export default useCalender
export type CalenderType = ReturnType<typeof useCalender>
