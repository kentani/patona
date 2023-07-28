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
  const beforePath: Ref<string> = ref('')

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
    await getRedirectResult(auth).then(async (result: UserCredential | null) => {
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
        console.error(error)
      })

    return appUser.value
  }

  const checkLoginState = async () => {
    return new Promise<void>((resolve) => {

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
    let users: Array<DocumentData> = []

    const querySnapshot = await getDocs(query(
      collection(db, "users"),
      orderBy('createdAt', 'asc')
    ))

    querySnapshot.forEach((doc) => {
      users.push(doc.data() || null)
    })

    allAppUsers.value = users

    return allAppUsers.value
  }

  const findUser = async (params: { id?: string, uid?: string, reload?: boolean }) => {
    const { id, uid, reload } = params

    if(!appUser.value || reload) {
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

    const docRef = doc(db, "users", uid)

    await setDoc(docRef, {
      id: docRef.id,
      uid: uid,
      name: name || '',
      admin: false,
      approved: false,
      invited: false,
      creatableGymCount: 0,
      createdGymCount: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })

    await findUser({ uid: uid, reload: true })

    return appUser.value
  }

  const updateUser = async (id: string, params: { name?: string, invited?: boolean, createdGymCount: number }) => {
    const docRef = doc(db, "users", id)

    await updateDoc(docRef, {
      ...params,
      updatedAt: serverTimestamp(),
    })

    await findUser({ id: id, reload: true })

    return appUser.value
  }

  const onLoadedAppUser = async (params?: { timeout?: number, interval?: number }) => {
    return new Promise<void>((resolve) => {
      const timeout = params?.timeout || 10
      const interval = params?.interval || 200
      let count = 0
      const intervalId = setInterval(() => {
        count++
        if(!appUser.value && count <= timeout) return
        clearInterval(intervalId)
        resolve()
      }, interval)
    })
  }

  return {
    authUser,
    appUser,
    allAppUsers,
    beforePath,
    isLogined,
    login,
    getLoginResult,
    logout,
    checkLoginState,
    findUser,
    whereAllUser,
    createUser,
    updateUser,
    onLoadedAppUser,
  }
}

export default useAuth
export type AuthType = ReturnType<typeof useAuth>
