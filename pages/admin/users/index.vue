<template>
  <v-container class="pt-0">
    <v-breadcrumbs
      :items="breadcrumbs"
      class="px-0 pt-1"
    >
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-row
      justify="start"
      align="center"
    >
      <v-col
        v-for="user in allAppUsers"
        :key="user.id"
        cols="12"
        sm="4"
        lg="3"
      >
        <v-card
          rounded="lg"
          :ripple="false"
          @click=""
        >

          <v-card-title>
            <div>
              {{ user.name }}
            </div>
          </v-card-title>

          <v-card-text class="text-body-1 text-left">
            <v-list-group>
              <v-list-item>

              </v-list-item>
            </v-list-group>
            <div>admin: {{ user.admin }}</div>
            <div>approved: {{ user.approved }}</div>
            <div>invited: {{ user.invited }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { allAppUsers, whereAllUser } = inject(AuthKey) as AuthType

const breadcrumbs = ref([
  { id: '1', title: 'メニュー', to: '/admin/menus', disabled: false },
  { id: '2', title: 'ユーザー一覧', to: '/admin/users', disabled: true },
])

definePageMeta({
  layout: 'admin'
})

onMounted(async () => {
  await whereAllUser()
})
</script>
