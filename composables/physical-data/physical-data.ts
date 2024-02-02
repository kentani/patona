import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc, QuerySnapshot, deleteDoc } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const usePhysicalData = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const physicalNumValues: Ref<Array<DocumentData>> = ref([])
  const physicalNumValue: Ref<any> = ref(null)
  const physicalDataLoaded: Ref<any> = ref(false)
  const physicalNumValueSettings: Ref<any> = ref([
    { id: '1', name: '体重', suffix: 'kg', key: 'weight', width: 70 },
    { id: '2', name: '体脂肪率', suffix: '%', key: 'fat', width: 90 },
    { id: '3', name: '身体年齢', suffix: '歳', key: 'bodyAge', width: 90 },
    { id: '4', name: 'BMI', suffix: '', key: 'bmi', width: 70 },
    { id: '5', name: '基礎代謝量', suffix: 'kcal', key: 'metabolism', width: 120 },
    { id: '6', name: '内臓脂肪レベル', suffix: '', key: 'visceral', width: 120 },
  ])
  const currentSetting: Ref<any> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const wherePhysicalNumValue = async (params: { gymId: string, memberId: string }) => {
    const { gymId, memberId } = params

    let tmpValues: Array<DocumentData> = []

    const querySnapshot = await getDocs(query(
      collection(db, 'physical-num-values'),
      where("gymId", "==", gymId),
      where("memberId", "==", memberId),
      orderBy('dateKey', 'asc')
    ))

    querySnapshot.forEach((doc) => {
      tmpValues.push(doc.data())
    })

    physicalNumValues.value = tmpValues

    return physicalNumValues.value
  }

  const findPhysicalNumValue = async (params: { id: string }) => {
    const { id } = params
    const docRef = doc(db, "physical-num-values", id)
    const docSnap = await getDoc(docRef)

    physicalNumValue.value = docSnap.data() || null

    return physicalNumValue.value
  }

  const createPhysicalNumValue  = async (params: { gymId: string, memberId: string, dateKey: string, detail: any }) => {
    const docRef = doc(collection(db, "physical-num-values"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findPhysicalNumValue({ id: docRef.id })

    return physicalNumValue.value
  }

  const updatePhysicalNumValue = async (id: string, params: { dateKey: string, detail: any }) => {
    const docRef = doc(db, "physical-num-values", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findPhysicalNumValue({ id: id })

    return physicalNumValue.value
  }

  const deletePhysicalNumValue = async (id: string) => {
    const docRef = doc(db, "physical-num-values", id)

    await deleteDoc(docRef);
  }

  const onLoadedPhysicalData = async (params?: { timeout?: number, interval?: number }) => {
    return new Promise<void>((resolve) => {
      const timeout = params?.timeout || 10
      const interval = params?.interval || 200
      let count = 0
      const intervalId = setInterval(() => {
        count++
        if(!physicalDataLoaded.value) return
        clearInterval(intervalId)
        resolve()
      }, interval)
    });
  }

  const setPhysicalNumValue = (val: any) => {
    physicalNumValue.value = val
  }

  const setCurrentSetting = (val: any) => {
    currentSetting.value = val
  }

  return {
    physicalNumValues,
    physicalNumValue,
    physicalDataLoaded,
    physicalNumValueSettings,
    currentSetting,
    wherePhysicalNumValue,
    findPhysicalNumValue,
    createPhysicalNumValue,
    updatePhysicalNumValue,
    deletePhysicalNumValue,
    onLoadedPhysicalData,
    setPhysicalNumValue,
    setCurrentSetting,
  }
}

export default usePhysicalData
export type PhysicalDataType = ReturnType<typeof usePhysicalData>
