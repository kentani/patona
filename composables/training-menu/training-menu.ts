import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc, QuerySnapshot } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useTrainingMenu = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const trainingMenus: Ref<Array<DocumentData>> = ref([])
  const trainingMenu: Ref<DocumentData|null> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereTrainingMenu = async (params: { gymId: string }) => {
    const { gymId } = params

    let tmpMenus: Array<DocumentData> = []

    const querySnapshot = await getDocs(query(
      collection(db, 'training-menus'),
      where("gymId", "==", gymId),
      orderBy('createdAt', 'asc')
    ))

    querySnapshot.forEach((doc) => {
      tmpMenus.push(doc.data() || null)
    })

    trainingMenus.value = tmpMenus

    return trainingMenus.value
  }

  const findTrainingMenu = async (params: { id: string }) => {
    const { id } = params
    const docRef = doc(db, "training-menus", id)
    const docSnap = await getDoc(docRef)

    trainingMenu.value = docSnap.data() || null

    return trainingMenu.value
  }

  const createTrainingMenu = async (params: { gymId: string, categoryId: string, name: string }) => {
    const docRef = doc(collection(db, "training-menus"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findTrainingMenu({ id: docRef.id })

    await whereTrainingMenu({ gymId: trainingMenu.value?.gymId })

    return trainingMenu.value
  }

  const updateTrainingMenu = async (id: string, params: { categoryId: string, name: string }) => {
    const docRef = doc(db, "training-menus", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findTrainingMenu({ id: id })

    await whereTrainingMenu({ gymId: trainingMenu.value?.gymId })

    return trainingMenu.value
  }

  return {
    trainingMenus,
    trainingMenu,
    whereTrainingMenu,
    findTrainingMenu,
    createTrainingMenu,
    updateTrainingMenu,
  }
}

export default useTrainingMenu
export type TrainingMenuType = ReturnType<typeof useTrainingMenu>
