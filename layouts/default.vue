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

const { appUser, checkLoginState } = inject(AuthKey) as AuthType

const router = useRouter()

onBeforeMount(async () => {
  await checkLoginState().then(() => {
    if(appUser.value) {
    } else {
      router.replace('/login')
    }
  })
})
</script>
