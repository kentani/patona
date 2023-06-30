import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc, QuerySnapshot } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useMember = () => {
  const { db } = useFirebase()

  ////////////////////
  // data
  ////////////////////
  const members: Ref<Array<DocumentData>> = ref([])
  const member: Ref<DocumentData|null> = ref(null)

  const filteredMembers: Ref<Array<DocumentData>> = ref([])

  const profiles: Ref<Array<{ id: string, name: string }>> = ref([
    { id: '1', name: '生年月日' },
    { id: '2', name: '性別' },
    { id: '3', name: '運動経験' },
    { id: '4', name: 'けが・病気' },
    { id: '5', name: '目的' },
    { id: '6', name: '目標' },
    { id: '7', name: 'メモ' },
  ])

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereMember = async (params: { gymId: string, instructorId?: string, includeArchive?: boolean }) => {
    const { gymId, instructorId, includeArchive } = params

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

    return members.value
  }

  const findMember = async (params: { id?: string, gymId?: string, instructorId?: string }) => {
    const { id, gymId, instructorId } = params

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

    await whereMember({ gymId: params.gymId, instructorId: params.instructorId })

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

  const setFilteredMembers = (members: Array<DocumentData>) => {
    filteredMembers.value = members
  }

  const filterMember = (params: { searchMemberName: string }) => {
    const { searchMemberName } = params
    let tmpMembers = members.value

    if(searchMemberName.length === 0) {
      setFilteredMembers(tmpMembers)
      return filteredMembers.value
    }

    tmpMembers = tmpMembers.filter(m => m.name.includes(searchMemberName))
    setFilteredMembers(tmpMembers)

    return filteredMembers.value
  }

  return {
    members,
    member,
    filteredMembers,
    profiles,
    whereMember,
    findMember,
    createMember,
    updateMember,
    setFilteredMembers,
    filterMember,
  }
}

export default useMember
export type MemberType = ReturnType<typeof useMember>
