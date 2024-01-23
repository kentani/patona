const useDateSelector = () => {
  ////////////////////
  // data
  ////////////////////
  const currentDate: Ref<any> = ref(null)
  const beforeDate: Ref<any> = ref(null)
  const afterDate: Ref<any> = ref(null)
  const beforeDateSelectOptions: Ref<any> = ref([])
  const afterDateSelectOptions: Ref<any> = ref([])
  const compare: Ref<boolean> = ref(false)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const setCurrentDate = (date: any) => {
    currentDate.value = date
  }

  const setBeforeDate = (date: any) => {
    beforeDate.value = date
  }

  const setAfterDate = (date: any) => {
    afterDate.value = date
  }

  const setCompare = (val: boolean) => {
    compare.value = val
  }

  return {
    currentDate,
    beforeDate,
    afterDate,
    beforeDateSelectOptions,
    compare,
    setCurrentDate,
    setBeforeDate,
    setAfterDate,
    setCompare,
  }
}

export default useDateSelector
export type DateSelectorType = ReturnType<typeof useDateSelector>
