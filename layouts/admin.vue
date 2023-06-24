<template>
  <v-app v-show="showable">
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

const showable = ref(false)

onMounted(async () => {
  await checkLoginState()
    .then(() => {
      if(appUser.value) {
        if(appUser.value.admin) {
          showable.value = true
        } else {
          throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
        }
      } else {
        router.replace('/login')
      }
    })
})
</script>
