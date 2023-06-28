<template>
  <v-app v-show="showable">
    <common-app-bar />

    <v-main>
      <slot />
    </v-main>
  </v-app>

  <v-app v-show="!showable">
    <common-loading />
  </v-app>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { appUser, checkLoginState, updateUser } = inject(AuthKey) as AuthType
const { gym, findGym } = inject(GymKey) as GymType
const { instructor, findInstructor, createInstructor } = inject(InstructorKey) as InstructorType

const router = useRouter()
const route = useRoute()

const showable = ref(false)

onMounted(async () => {
  await checkLoginState()
    .then(async () => {
      if(appUser.value) {
        if(appUser.value.admin) {
          router.replace('/admin/menus')
        } else {
          await findGym({ id: String(route.query.gymId) })

          if(!gym.value) {
            throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
          }

          await findInstructor({ userId: appUser.value?.id, gymId: gym.value?.id })

          if(instructor.value) {
            router.replace({ path: '/i/menus', query: { gymId: gym.value?.id } })
          } else {
            await createInstructor({ userId: appUser.value?.id, gymId: gym.value?.id, owner: false, name: appUser.value.name })
            await updateUser(appUser.value.id, { invited: true })
            router.replace({ path: '/i/menus', query: { gymId: gym.value?.id } })
          }
        }
      } else {
        router.replace('/login')
      }
    })
})
</script>
