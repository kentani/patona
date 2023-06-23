import { getFirestore } from 'firebase/firestore';

const useFirebase = () => {
  const nuxtApp = useNuxtApp()
  const firebase: any = nuxtApp.$firebase

  const db = getFirestore(firebase)

  return {
    db
  }
}

export default useFirebase
export type FirebaseType = ReturnType<typeof useFirebase>
