<template>
  <v-app v-show="isShow">
    <common-app-bar />

    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser, getLoginResult, checkLoginState } = inject(AuthKey) as AuthType
const router = useRouter()

const showable = ref(false)

const isShow = computed(() => {
  return showable.value
})

onMounted(async () => {
  await getLoginResult()

  await checkLoginState()
    .then(() => {
      if(appUser.value) {
        if(appUser.value.admin) {
          router.replace('/admin/menus')
        } else if(appUser.value.approved || appUser.value.invited) {
          router.replace('/i/gyms')
        } else {
          router.replace('/apply')
        }
      } else {
        showable.value = true
      }
    })
})
</script>
