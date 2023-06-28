import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useGym = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const gyms: Ref<Array<DocumentData>> = ref([])
  const gym: Ref<DocumentData|null> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereGym = async (params: { ids?: Array<string>, all?: boolean, reload?: boolean }) => {
    const { ids, all, reload } = params

    let tmpGyms: Array<DocumentData> = []

    if(ids?.length) {
      const querySnapshot = await getDocs(query(
        collection(db, 'gyms'),
        where('id', 'in', ids),
        orderBy('createdAt', 'asc')
      ))

      querySnapshot.forEach((doc) => {
        tmpGyms.push(doc.data() || null)
      })
    } else if(all) {
      const querySnapshot = await getDocs(collection(db, 'gyms'))

      querySnapshot.forEach((doc) => {
        tmpGyms.push(doc.data() || null)
      })
    }

    gyms.value = tmpGyms

    return gyms.value
  }

  const findGym = async (params: { id: string, reload?: boolean }) => {
    const { id, reload } = params

    const docRef = doc(db, "gyms", id)
    const docSnap = await getDoc(docRef)

    gym.value = docSnap.data() || null

    return gym.value
  }

  const createGym = async (params: { userId: string, name: string }) => {
    const docRef = doc(collection(db, "gyms"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findGym({ id: docRef.id })

    return gym.value
  }

  const updateGym = async (id: string, params: { name: string }) => {
    const docRef = doc(db, "gyms", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findGym({ id: id })

    return gym.value
  }

  const onLoadedGym = async (params?: { timeout?: number, interval?: number }) => {
    return new Promise<void>((resolve) => {
      const timeout = params?.timeout || 10
      const interval = params?.interval || 200
      let count = 0
      const intervalId = setInterval(() => {
        count++
        if(!gym.value && count <= timeout) return
        clearInterval(intervalId)
        resolve()
      }, interval)
    });
  }

  const resetGym = () => {
    gym.value = null
  }

  return {
    gyms,
    gym,
    whereGym,
    findGym,
    createGym,
    updateGym,
    onLoadedGym,
    resetGym,
  }
}

export default useGym
export type GymType = ReturnType<typeof useGym>
