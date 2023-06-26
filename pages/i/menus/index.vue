<template>
  <v-container>
    <v-breadcrumbs
      :items="breadcrumbs"
      class="px-0 pt-1"
    >
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-row
      justify="center"
      align="center"
    >
      <v-col
        v-for="menu in menus"
        :key="menu.id"
        cols="12"
        sm="4"
        lg="3"
      >
        <v-card
          rounded="xl"
          elevation="8"
          @click="onClickMenu(menu)"
        >
          <v-card-text class="text-body-1 font-weight-bold text-center">
            <v-icon size="150">{{ menu.icon }}</v-icon>
            <p class="mb-0">{{ menu.name }}</p>
          </v-card-text>
        </v-card>
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
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const router = useRouter()
const route = useRoute()

const menus = ref([
  { id: '1', name: '顧客一覧', icon: 'mdi-account-group', to: '/i/members' },
  // { id: '2', name: '設定', icon: 'mdi-cog ', to: '/i/settings' },
])
const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: false },
  { id: '2', title: 'メニュー', to: `/i/menus?gymId=${route.query.gymId}`, disabled: true },
])

const onClickMenu = (menu: { id: string, name: string, icon: string, to: string }) => {
  router.push({ path: menu.to, query: { gymId: route.query.gymId } })
}

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
