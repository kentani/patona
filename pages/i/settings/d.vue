<template>
  <v-container>
    <common-breadcrumbs
      :breadcrumbs="breadcrumbs"
    />

    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="3"
      >
        <common-tabs
          base-url="/i/settings/d/setting-"
          :tabs="tabs"
        />
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="9"
      >
        <NuxtPage page-key="setting" />
      </v-col>
    </v-row>
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
const { hide, show } = inject(ScreenControllerKey) as ScreenControllerType

const route = useRoute()

const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: false },
  { id: '2', title: 'メニュー', to: `/i/menus?gymId=${route.query.gymId}`, disabled: false },
  { id: '3', title: '設定', to: `/i/settings/d/setting-gym?gymId=${route.query.gymId}`, disabled: true },
])

const tabs = ref([
  { id: '1', title: 'ジム情報', to: 'gym', disabled: false, cols: 6, sm: 3, md: 3, lg: 12 },
  { id: '2', title: '権限', to: 'role', disabled: true, cols: 6, sm: 3, md: 3, lg: 12 },
  { id: '3', title: 'パーソナルデータ', to: 'personal-data', disabled: true, cols: 6, sm: 3, md: 3, lg: 12 },
  { id: '4', title: 'トレーニング', to: 'training', disabled: false, cols: 6, sm: 3, md: 3, lg: 12 },
])

onMounted(async () => {
  hide()

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
