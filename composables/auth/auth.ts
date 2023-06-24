import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, signInWithRedirect, getRedirectResult, UserCredential } from "firebase/auth"
import { collection, query, where, getDocs, orderBy, limit, doc, setDoc, serverTimestamp, DocumentData, updateDoc, getDoc } from "firebase/firestore"
import useFirebase from "../firebase/firebase"

const useAuth = () => {
  const { db } = useFirebase()
  const auth = getAuth()
  const googleProvider = new GoogleAuthProvider()
  googleProvider.addScope('https://www.googleapis.com/auth/contacts.readonly')
  ////////////////////
  // data
  ////////////////////
  const authUser: Ref<DocumentData|null> = ref(null)
  const appUser: Ref<DocumentData|null> = ref(null)
  const allAppUsers: Ref<Array<DocumentData>> = ref([])

  ////////////////////
  // computed
  ////////////////////
  const isLogined = computed(() => {
    return !!authUser.value && !!appUser.value
  })

  ////////////////////
  // logic
  ////////////////////
  const login = async () => {
    await signInWithRedirect(auth, googleProvider)
  }

  const getLoginResult = async () => {
    await getRedirectResult(auth)
      .then(async (result: UserCredential | null) => {
        if(result) {
          authUser.value = result.user
          await findUser({ uid: result.user.uid })

          if(appUser.value) {
            return appUser.value
          } else {
            await createUser({ uid: result.user.uid, name: result.user.displayName })

            return appUser.value
          }
        }
      }).catch((error) => {
        console.error(error)
      })
  }

  const logout = async () => {
    await signOut(auth)
      .then(() => {
        authUser.value = null
        appUser.value = null
      }).catch((error) => {
        console.log(error)
      })

    return appUser.value
  }

  const checkLoginState = async () => {
    await new Promise<void>((resolve) => {

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          authUser.value = user
          await findUser({ uid: user.uid })
        } else {
          authUser.value = null
          appUser.value = null
        }

        resolve()
      })
    })
  }

  const whereAllUser = async () => {
    const querySnapshot = await getDocs(collection(db, "users"))
    let users: Array<DocumentData> = []

    querySnapshot.forEach((doc) => {
      users.push(doc.data() || null)
    })

    allAppUsers.value = users

    return allAppUsers.value
  }

  const findUser = async (params: { id?: string, uid?: string }) => {
    const { id, uid } = params

    if(!appUser.value) {

      if(!!id) {
        const docRef = doc(db, "users", id)
        const docSnap = await getDoc(docRef)

        appUser.value = docSnap.data() || null

      } else if(!!uid) {
        const querySnapshot = await getDocs(query(
          collection(db, 'users'),
          where("uid", "==", uid),
          limit(1)
        ))

        querySnapshot.forEach((doc) => {
          appUser.value = doc.data() || null
        })
      }
    }

    return appUser.value
  }

  const createUser = async (params: { uid: string, name: string|null }) => {
    const { uid, name } = params

    const docRef = doc(collection(db, "users"))

    await setDoc(docRef, {
      id: docRef.id,
      uid: uid,
      name: name || '',
      admin: false,
      approved: false,
      invited: false,
      creatableGymCount: 0,
      joinedGyms: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findUser({ uid: uid })

    return appUser.value
  }

  const updateUser = async (params: { id: string, name: string }) => {
    const { id } = params

    const docRef = doc(db, "users", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findUser({ id: id })

    return appUser.value
  }

  return {
    authUser,
    appUser,
    allAppUsers,
    isLogined,
    login,
    getLoginResult,
    logout,
    checkLoginState,
    findUser,
    whereAllUser,
    createUser,
    updateUser
  }
}

export default useAuth
export type AuthType = ReturnType<typeof useAuth>
