<template>
  <v-app>
    <common-app-bar />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser, getLoginResult } = inject(AuthKey) as AuthType

const router = useRouter()

onMounted(async () => {
  await getLoginResult()

  if(appUser.value) {
    router.replace('/')
  }
})
</script>
