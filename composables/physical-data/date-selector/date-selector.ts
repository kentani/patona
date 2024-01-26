const useDateSelector = () => {
  ////////////////////
  // data
  ////////////////////
  const beforeDate: Ref<any> = ref(null)
  const afterDate: Ref<any> = ref(null)
  const compare: Ref<any> = ref(false)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const setBeforeDate = (date: any) => {
    beforeDate.value = date
  }

  const setAfterDate = (date: any) => {
    afterDate.value = date
  }

  const setCompare = (c: any) => {
    compare.value = c
  }

  return {
    beforeDate,
    afterDate,
    compare,
    setBeforeDate,
    setAfterDate,
    setCompare,
  }
}

export default useDateSelector
export type DateSelectorType = ReturnType<typeof useDateSelector>
