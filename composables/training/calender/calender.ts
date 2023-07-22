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
  const selectedDate: Ref<Number|null> = ref(getDate(today.value))
  const currentYearMonth = ref('')
  const currentYearMonthDate = ref('')
  const week = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
  const dateList: Ref<Array<any>> = ref([])

  const setCurrentDate = (date: any) => {
    currentDate.value = new Date(`${format(currentDate.value, 'yyyy-MM-')}${date}`)
  }

  const setSelectedDate = (date: Number) => {
    selectedDate.value = date
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
    setCurrentYearMonth()
    setCurrentYearMonthDate()
    setDateList()
  }

  const nextMonth = () => {
    currentDate.value = addMonths(currentDate.value, 1)
    setCurrentYearMonth()
    setCurrentYearMonthDate()
    setDateList()
  }

  const isToday = (date: Number|null) => {
    if(!date) return

    const d = new Date(`${format(currentDate.value, 'yyyy-MM-')}${date}`)

    return format(d, 'yyyyMMdd') === format(today.value, 'yyyyMMdd')
  }

  return {
    today,
    currentDate,
    selectedDate,
    currentYearMonth,
    currentYearMonthDate,
    week,
    dateList,
    setCurrentDate,
    setSelectedDate,
    setCurrentYearMonth,
    setCurrentYearMonthDate,
    setDateList,
    prevMonth,
    nextMonth,
    isToday,
  }
}

export default useCalender
export type CalenderType = ReturnType<typeof useCalender>
