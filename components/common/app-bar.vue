<template>
  <v-app-bar
    app
    fixed
    flat
    density="compact"
    color="green1"
  >
    <v-toolbar-title class="text-body-1 font-weight-bold">
      {{ title }}
    </v-toolbar-title>

    <template v-slot:append>
      <div class="text-body-2">{{ gym?.name }}</div>

      <div v-if="gym && instructor" class="px-2 text-body-2">|</div>

      <div class="pr-2 text-body-2">{{ instructor?.name }}</div>

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
            v-for="menu in menus"
            :key="menu.id"
            density="compact"
            class="pb-1 px-4"
            style="min-height: 0px;"
            :disabled="menu.disabled"
            @click="onClickMenu(menu)"
          >
            <v-list-item-title class="pa-0 text-caption">{{ menu.title }}</v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="appUser?.admin"
            v-for="menu in adminMenus"
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
    </template>
  </v-app-bar>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { appUser, logout } = inject(AuthKey) as AuthType
const { gym, resetGym } = inject(GymKey) as GymType
const { instructor, resetInstructor } = inject(InstructorKey) as InstructorType
const router = useRouter()

const title = ref('PATONA')

const menus = ref([
  { id: '1', key: 'my-page', title: 'マイページ', disabled: !instructor.value },
  { id: '2', key: 'logout', title: 'ログアウト', disabled: false }
])

const adminMenus = ref([
  { id: '1', key: 'to-admin', title: '管理者画面', disabled: !appUser.value?.admin },
])

const onClickMenu = async (menu: any) => {
  resetGym()
  resetInstructor()

  if(menu.key === 'logout') {
    await logout()
    router.replace('/login')
  } else if(menu.key === 'to-admin') {
    router.push('/admin/menus')
  }
}
</script>
