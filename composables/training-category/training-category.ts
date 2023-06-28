import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc, QuerySnapshot } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useTrainingCategory = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const trainingCategories: Ref<Array<DocumentData>> = ref([])
  const trainingCategory: Ref<DocumentData|null> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereTrainingCategory = async (params: { gymId: string }) => {
    const { gymId } = params

    if(!trainingCategories.value.length) {

      let tmpCategories: Array<DocumentData> = []

      const querySnapshot = await getDocs(query(
        collection(db, 'training-categories'),
        where("gymId", "==", gymId),
        orderBy('createdAt', 'asc')
      ))

      querySnapshot.forEach((doc) => {
        tmpCategories.push(doc.data() || null)
      })

      trainingCategories.value = tmpCategories
    }

    return trainingCategories.value
  }

  const findTrainingCategory = async (params: { id: string }) => {
    const { id } = params
    const docRef = doc(db, "training-categories", id)
    const docSnap = await getDoc(docRef)

    trainingCategory.value = docSnap.data() || null

    return trainingCategory.value
  }

  const createTrainingCategory = async (params: { gymId: string, name: string }) => {
    const docRef = doc(collection(db, "training-categories"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findTrainingCategory({ id: docRef.id })

    return trainingCategory.value
  }

  const updateTrainingCategory = async (id: string, params: { name: string }) => {
    const docRef = doc(db, "training-categories", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findTrainingCategory({ id: id })

    return trainingCategory.value
  }

  return {
    trainingCategories,
    trainingCategory,
    whereTrainingCategory,
    findTrainingCategory,
    createTrainingCategory,
    updateTrainingCategory,
  }
}

export default useTrainingCategory
export type TrainingCategoryType = ReturnType<typeof useTrainingCategory>