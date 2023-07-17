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
  const searchMemberName: Ref<string> = ref('')

  const genders: Ref<Array<{ id: string, title: string }>> = ref([
    { id: '1', title: '選択しない' },
    { id: '2', title: '男性' },
    { id: '3', title: '女性' },
    { id: '4', title: 'その他' },
  ])

  const profiles: Ref<Array<{ id: string, title: string, cols: number, sm: number }>> = ref([
    { id: '1', title: '目的', cols: 12, sm: 6 },
    { id: '2', title: '目標', cols: 12, sm: 6 },
    { id: '3', title: '運動経験', cols: 12, sm: 6 },
    { id: '4', title: 'けが・病気', cols: 12, sm: 6 },
    { id: '5', title: 'メモ', cols: 12, sm: 12 },
  ])

  ////////////////////
  // computed
  ////////////////////

  ////////////////////
  // logic
  ////////////////////
  const whereMember = async (params: { gymId: string, instructorId?: string, instructorIds?: Array<string>, includeArchive?: boolean }) => {
    const { gymId, instructorId, instructorIds, includeArchive } = params

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
    } else if(instructorIds) {
      if(includeArchive) {
        const querySnapshot = await getDocs(query(
          collection(db, 'members'),
          where("gymId", "==", gymId),
          where("instructorIds", "array-contains-any", instructorIds),
          orderBy('createdAt', 'asc')
        ))

        querySnapshot.forEach((doc) => {
          tmpMembers.push(doc.data() || null)
        })
      } else {
        const querySnapshot = await getDocs(query(
          collection(db, 'members'),
          where("gymId", "==", gymId),
          where("instructorIds", "array-contains-any", instructorIds),
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

  const createMember = async (params: { gymId: string, instructorId: string, instructorIds: Array<string>, archived: boolean, name: string, imageName: string, imageURL: string, detail: any }) => {
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

  const updateMember = async (id: string, params: { instructorId?: string, instructorIds?: Array<string>, archived?: boolean, name?: string, imageName?: string, imageURL?: string, detail?: any }) => {
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

  const setSearchMemberName = (name: string) => {
    searchMemberName.value = name
  }

  const resetMembers = () => {
    members.value = []
    filterMember()
  }

  const resetMember = () => {
    member.value = null
  }

  const filterMember = () => {
    let tmpMembers = members.value

    if(searchMemberName.value.length === 0) {
      setFilteredMembers(tmpMembers)
      return filteredMembers.value
    }

    tmpMembers = tmpMembers.filter(m => m.name.includes(searchMemberName.value))
    setFilteredMembers(tmpMembers)

    return filteredMembers.value
  }

  return {
    members,
    member,
    filteredMembers,
    searchMemberName,
    genders,
    profiles,
    whereMember,
    findMember,
    createMember,
    updateMember,
    setFilteredMembers,
    setSearchMemberName,
    resetMembers,
    resetMember,
    filterMember,
  }
}

export default useMember
export type MemberType = ReturnType<typeof useMember>
