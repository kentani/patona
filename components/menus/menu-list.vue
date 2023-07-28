<template>
  <v-row
    justify="center"
    align="center"
    :class="$vuetify.display.xs ? '' : 'raise'"
  >
    <v-col
      v-for="menu in menus"
      :key="menu.id"
      cols="6"
      sm="4"
      md="3"
      lg="2"
      :align-self="$vuetify.display.xs ? 'start' : 'center'"
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
                class="text-h6 font-weight-bold text-center"
              >
                <v-icon size="120">{{ menu.icon }}</v-icon>
                <p class="pb-2">{{ menu.name }}</p>
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
const { instructor, onLoadedInstructor } = inject(InstructorKey) as InstructorType

const router = useRouter()

const menus = ref([
  { id: '1', name: '会員一覧', icon: 'mdi-account-group', to: '/i/members', disabled: false },
  { id: '2', name: '設定', icon: 'mdi-cog ', to: '/i/settings/d/setting-gym', disabled: true },
])

const onClickMenu = (menu: { id: string, name: string, icon: string, to: string }) => {
  router.push({ path: menu.to, query: { gymId: gym.value?.id } })
}

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    await onLoadedInstructor().then(() => {
      menus.value[1].disabled = !appUser.value?.admin && !instructor.value?.owner
    })
  })
})
</script>

<style scoped>
.raise {
  height: 85vh;
}
</style>
