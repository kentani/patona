<template>
  <v-app-bar
    app
    fixed
    flat
    density="compact"
  >
    <v-toolbar-title class="mx-0">
      <v-row
        dense
        no-gutters
        align="center"
        class="px-2"
      >
        <v-col class="text-h6 text-left font-weight-bold">
          {{ title }}
        </v-col>

        <v-spacer />

        <v-col cols="auto" class="text-body-2 text-center">
          サンプルジム
        </v-col>

        <v-col cols="auto" class="mx-1 text-body-2 text-center">
          |
        </v-col>

        <v-col cols="auto" class="text-body-2 text-center">
          {{ appUser?.name }}
        </v-col>

        <v-col cols="auto" class="ml-2 text-body-2 text-center">
          <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn
                v-bind="props"
                icon="mdi-dots-vertical"
                density="compact"
                :ripple="false"
              ></v-btn>
            </template>

            <v-list density="compact" class="pa-0">
              <v-list-item
                v-for="(item, index) in menus"
                :key="item.id"
                density="compact"
                class="pb-1 px-4"
                style="min-height: 0px;"
                @click="onClickMenu(index)"
              >
                <v-list-item-title class="pa-0 text-caption">{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser, logout } = inject(AuthKey) as AuthType
const router = useRouter()

const title = ref('PATONA')
const menus = ref([
  { id: '1', key: 'my-page', title: 'マイページ' },
  { id: '2', key: 'logout', title: 'ログアウト' },
])

const onClickMenu = async (index: any) => {
  const menu = menus.value[index]

  if(menu.key === 'logout') {
    await logout()
    router.replace('/login')
  }
}
</script>
