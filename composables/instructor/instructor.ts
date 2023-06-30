import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useInstructor = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const instructors: Ref<Array<DocumentData>> = ref([])
  const instructor: Ref<DocumentData|null> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereInstructor = async (params: { userId?: string, gymId?: string }) => {
    const { userId, gymId } = params

    let tmpInstructors: Array<DocumentData> = []

    if(userId && userId.length) {
      const querySnapshot = await getDocs(query(
        collection(db, 'instructors'),
        where("userId", "==", userId),
        orderBy('createdAt', 'asc')
      ))

      querySnapshot.forEach((doc) => {
        tmpInstructors.push(doc.data() || null)
      })
    } else if(gymId && gymId.length) {
      const querySnapshot = await getDocs(query(
        collection(db, 'instructors'),
        where("gymId", "==", gymId),
        orderBy('createdAt', 'asc')
      ))

      querySnapshot.forEach((doc) => {
        tmpInstructors.push(doc.data() || null)
      })
    }

    instructors.value = tmpInstructors

    return instructors.value
  }

  const findInstructor = async (params: { id?: string, userId?: string, gymId?: string }) => {
    const { id, userId, gymId } = params

    if(id) {
      const docRef = doc(db, "instructors", id)
      const docSnap = await getDoc(docRef)

      instructor.value = docSnap.data() || null
    } else if(userId && gymId) {
      const querySnapshot = await getDocs(query(
        collection(db, 'instructors'),
        where("gymId", "==", gymId),
        where("userId", "==", userId),
        limit(1)
      ))

      querySnapshot.forEach((doc) => {
        instructor.value = doc.data() || null
      })
    }

    return instructor.value
  }

  const createInstructor = async (params: { userId: string, gymId: string, owner: boolean, name: string }) => {
    const docRef = doc(collection(db, "instructors"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findInstructor({ id: docRef.id })

    return instructor.value
  }

  const updateInstructor = async (id: string, params: { name?: string, members?: Array<string> }) => {
    const docRef = doc(db, "instructors", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findInstructor({ id: id })

    return instructor.value
  }

  const onLoadedInstructor = async (params?: { timeout?: number, interval?: number }) => {
    return new Promise<void>((resolve) => {
      const timeout = params?.timeout || 10
      const interval = params?.interval || 200
      let count = 0
      const intervalId = setInterval(() => {
        count++
        if(!instructor.value && count <= timeout) return
        clearInterval(intervalId)
        resolve()
      }, interval)
    });
  }

  const resetInstructor = () => {
    instructor.value = null
  }

  return {
    instructors,
    instructor,
    whereInstructor,
    findInstructor,
    createInstructor,
    updateInstructor,
    onLoadedInstructor,
    resetInstructor,
  }
}

export default useInstructor
export type InstructorType = ReturnType<typeof useInstructor>
