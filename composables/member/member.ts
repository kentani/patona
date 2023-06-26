import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc, QuerySnapshot } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useMember = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const members: Ref<Array<DocumentData>> = ref([])
  const member: Ref<DocumentData|null> = ref(null)

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereMember = async (params: { gymId: string, instructorId?: string, includeArchive?: boolean }) => {
    const { gymId, instructorId, includeArchive } = params

    if(!members.value.length) {

      let tmpMembers: Array<DocumentData> = []

      if(instructorId) {
        if(includeArchive) {
          const querySnapshot = await getDocs(query(
            collection(db, 'members'),
            where("gymId", "==", gymId),
            where("instructorId", "==", instructorId),
            orderBy('createdAt', 'asc')
          ))

          querySnapshot.forEach((doc) => {
            tmpMembers.push(doc.data() || null)
          })
        } else {
          const querySnapshot = await getDocs(query(
            collection(db, 'members'),
            where("gymId", "==", gymId),
            where("instructorId", "==", instructorId),
            where('archived', '==', false),
            orderBy('createdAt', 'asc')
          ))

          querySnapshot.forEach((doc) => {
            tmpMembers.push(doc.data() || null)
          })
        }
      } else {
        if(includeArchive) {
          const querySnapshot = await getDocs(query(
            collection(db, 'members'),
            where("gymId", "==", gymId),
            orderBy('createdAt', 'asc')
          ))

          querySnapshot.forEach((doc) => {
            tmpMembers.push(doc.data() || null)
          })
        } else {
          const querySnapshot = await getDocs(query(
            collection(db, 'members'),
            where("gymId", "==", gymId),
            where('archived', '==', false),
            orderBy('createdAt', 'asc')
          ))

          querySnapshot.forEach((doc) => {
            tmpMembers.push(doc.data() || null)
          })
        }
      }

      members.value = tmpMembers
    }

    return members.value
  }

  const findMember = async (params: { id?: string, gymId?: string, instructorId?: string }) => {
    const { id, gymId, instructorId } = params

    if(!member.value) {
      if(id) {
        const docRef = doc(db, "members", id)
        const docSnap = await getDoc(docRef)

        member.value = docSnap.data() || null
      } else if(gymId && instructorId) {
        const querySnapshot = await getDocs(query(
          collection(db, 'members'),
          where("gymId", "==", gymId),
          where("instructorId", "==", instructorId),
          limit(1)
        ))

        querySnapshot.forEach((doc) => {
          member.value = doc.data() || null
        })
      }
    }

    return member.value
  }

  const createMember = async (params: { gymId: string, instructorId: string, archived: boolean, name: string, imageName: string, imageURL: string, detail: any }) => {
    const docRef = doc(collection(db, "members"))

    await setDoc(docRef, {
      ...params,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findMember({ id: docRef.id })

    return member.value
  }

  const updateMember = async (id: string, params: { instructorId?: string, archived?: boolean, name?: string, imageName?: string, imageURL?: string, detail?: any }) => {
    const docRef = doc(db, "members", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findMember({ id: id })

    return member.value
  }

  return {
    members,
    member,
    whereMember,
    findMember,
    createMember,
    updateMember,
  }
}

export default useMember
export type MemberType = ReturnType<typeof useMember>
