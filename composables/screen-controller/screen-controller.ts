import useAuth from "../auth/auth"
import AuthKey from "../auth/auth-key"
import useGym from "../gym/gym"
import useInstructor from "../instructor/instructor"

const useScreenController = () => {
  const { appUser, onLoadedAppUser } = useAuth()
  const { gym, findGym } = useGym()
  const { instructor, findInstructor } = useInstructor()

  const screenShowable = ref(false)

  const show = () => {
    screenShowable.value = true
  }

  const hide = () => {
    screenShowable.value = false
  }

  const screenControl = (pageName: string, params?: any) => {
    switch(pageName) {
      case 'i-menus':
        iMenus({
          userId: params.userId,
          gymId: params.gymId
        })
        break
    }
  }

  const iMenus = async (params: { userId: string, gymId: string }) => {
    const { userId, gymId } = params

    await findGym({ id: gymId })
    await findInstructor({ userId: userId, gymId: gymId })

    if(!gym.value || (!appUser.value?.admin && !instructor.value)) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }
  }

  return {
    screenShowable,
    show,
    hide
  }
}

export default useScreenController
export type ScreenControllerType = ReturnType<typeof useScreenController>

