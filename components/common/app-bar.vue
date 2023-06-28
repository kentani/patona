<template>
  <v-app-bar
    app
    fixed
    flat
    density="compact"
  >
    <v-toolbar-title class="text-body-1 font-weight-bold">
      {{ title }}
    </v-toolbar-title>

    <v-row
      v-if="isLogined"
      dense
      no-gutters
      align="center"
      class="px-2 text-body-2 text-center"
    >
      <v-spacer />

      <v-col
        cols="auto"
      >
        {{ gym?.name }}
      </v-col>

      <v-col
        v-if="gym"
        cols="auto"
        class="mx-1"
      >
        |
      </v-col>

      <v-col
        cols="auto"
      >
        {{ appUser?.name }}
      </v-col>

      <v-col
        cols="auto"
        class="ml-2"
      >
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn
              v-bind="props"
              icon="mdi-dots-vertical"
              density="compact"
              :ripple="false"
            ></v-btn>
          </template>

          <v-list
            density="compact"
            class="pa-0"
          >
            <v-list-item
              v-for="(menu, index) in menus"
              :key="menu.id"
              density="compact"
              class="pb-1 px-4"
              style="min-height: 0px;"
              @click="onClickMenu(menu)"
            >
              <v-list-item-title class="pa-0 text-caption">{{ menu.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"

const { appUser, isLogined, logout } = inject(AuthKey) as AuthType
const { gym, resetGym } = inject(GymKey) as GymType
const router = useRouter()

const title = ref('PATONA')
const menus = ref([
  { id: '1', key: 'my-page', title: 'マイページ' },
  { id: '2', key: 'logout', title: 'ログアウト' },
])

const onClickMenu = async (menu: any) => {
  if(menu.key === 'logout') {
    resetGym()
    await logout()
    router.replace('/login')
  }
}
</script>
