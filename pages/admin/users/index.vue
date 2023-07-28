<template>
  <v-container
    fluid
  >
    <common-breadcrumbs
      :breadcrumbs="breadcrumbs"
    />

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

          <v-card-title class="pb-4 text-h6 font-weight-bold">
            <div>
              {{ user.name }}
            </div>
          </v-card-title>

          <v-card-text class="pb-4 text-caption text-left">
            <common-accent-block
              title="admin"
              :text="user.admin"
              class="pt-0 pb-2"
            />

            <common-accent-block
              title="approved"
              :text="user.approved"
              class="py-2"
            />

            <common-accent-block
              title="invited"
              :text="user.invited"
              class="py-2"
            />

            <common-accent-block
              title="作成可能なジム数"
              :text="user.creatableGymCount"
              class="py-2"
            />

            <common-accent-block
              title="作成したジム数"
              :text="user.createdGymCount"
              class="py-2"
            />


            <common-accent-block
              title="登録日"
              :text="formattedDate(user.createdAt)"
              class="pt-2 pb-0"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { allAppUsers, whereAllUser } = inject(AuthKey) as AuthType

const breadcrumbs = ref([
  { id: '1', title: 'メニュー', to: '/admin/menus', disabled: false },
  { id: '2', title: 'ユーザー一覧', to: '/admin/users', disabled: true },
])

const formattedDate = (timestamp: any) => {
  return format(timestamp.toDate(), 'yyyy-MM-dd')
}

definePageMeta({
  layout: 'admin'
})

onMounted(async () => {
  await whereAllUser()
})
</script>
