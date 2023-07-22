import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc, QuerySnapshot } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useTraining = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const trainings: Ref<Array<DocumentData>> = ref([])
  const training: Ref<DocumentData|null> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereTraining = async (params: { gymId: string, memberId?: string }) => {
    const { gymId, memberId } = params

    let tmpTrainings: Array<DocumentData> = []

    if(memberId) {
      const querySnapshot = await getDocs(query(
        collection(db, 'trainings'),
        where("gymId", "==", gymId),
        where("memberId", "==", memberId),
        orderBy('createdAt', 'asc')
      ))

      querySnapshot.forEach((doc) => {
        tmpTrainings.push(doc.data() || null)
      })
    } else {
      const querySnapshot = await getDocs(query(
        collection(db, 'trainings'),
        where("gymId", "==", gymId),
        orderBy('createdAt', 'asc')
      ))

      querySnapshot.forEach((doc) => {
        tmpTrainings.push(doc.data() || null)
      })
    }

    trainings.value = tmpTrainings

    return trainings.value
  }

  const findTraining = async (params: { id: string }) => {
    const { id } = params
    const docRef = doc(db, "trainings", id)
    const docSnap = await getDoc(docRef)

    training.value = docSnap.data() || null

    return training.value
  }

  const createTraining = async (params: { gymId: string, memberId: string, categoryId: string, menuId: string, dateKey: string, detail: any }) => {
    const docRef = doc(collection(db, "trainings"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findTraining({ id: docRef.id })

    return training.value
  }

  const updateTraining = async (id: string, params: { dateKey: string, detail: any }) => {
    const docRef = doc(db, "trainings", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findTraining({ id: id })

    return training.value
  }

  return {
    training,
    trainings,
    whereTraining,
    findTraining,
    createTraining,
    updateTraining,
  }
}

export default useTraining
export type TrainingType = ReturnType<typeof useTraining>
