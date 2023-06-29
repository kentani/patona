<template>
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
        <v-hover>
          <template v-slot:default="{ isHovering, props }">
            <v-card
              v-bind="props"
              variant="elevated"
              rounded="xl"
              color="green1"
              :ripple="false"
              :disabled="menu.disabled"
              :elevation="isHovering ? 24 : 8"
              @click="onClickMenu(menu)"
            >
              <v-card-text
                class="text-body-1 font-weight-bold text-center"
              >
                <v-icon size="150">{{ menu.icon }}</v-icon>
                <p class="mb-0">{{ menu.name }}</p>
              </v-card-text>
            </v-card>
          </template>
        </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { appUser, onLoadedAppUser } = inject(AuthKey) as AuthType
const { gym } = inject(GymKey) as GymType
const { instructor } = inject(InstructorKey) as InstructorType

const router = useRouter()

const menus = ref([
  { id: '1', name: '顧客一覧', icon: 'mdi-account-group', to: '/i/members', disabled: false },
  { id: '2', name: '設定', icon: 'mdi-cog ', to: '/i/settings/d/setting-gym', disabled: true },
])

const onClickMenu = (menu: { id: string, name: string, icon: string, to: string }) => {
  router.push({ path: menu.to, query: { gymId: gym.value?.id } })
}

onMounted(async () => {
  await onLoadedAppUser().then(() => {
    menus.value[1].disabled = !appUser.value?.admin && !instructor.value?.owner
  })
})
</script>
