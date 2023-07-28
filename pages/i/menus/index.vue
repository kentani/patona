<template>
  <v-container
    fluid
  >
    <common-breadcrumbs
      :breadcrumbs="breadcrumbs"
    />

    <menus-menu-list />
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import { ScreenControllerType } from "@/composables/screen-controller/screen-controller"
import ScreenControllerKey from "@/composables/screen-controller/screen-controller-key"

const { appUser, onLoadedAppUser } = inject(AuthKey) as AuthType
const { gym, findGym } = inject(GymKey) as GymType
const { instructor, findInstructor } = inject(InstructorKey) as InstructorType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const route = useRoute()

const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: false },
  { id: '2', title: 'メニュー', to: `/i/menus?gymId=${route.query.gymId}`, disabled: true },
])

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    await findGym({ id: String(route.query.gymId) })
    await findInstructor({ userId: appUser.value?.id, gymId: String(route.query.gymId) })

    if(!gym.value || (!appUser.value?.admin && !instructor.value)) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }
  })

  show()
})
</script>
