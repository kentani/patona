<template>
  <v-app v-show="showable && screenShowable" class="text-font">
    <common-app-bar />

    <v-main>
      <slot />
    </v-main>
  </v-app>

  <v-app v-show="!showable && !screenShowable">
    <common-loading />
  </v-app>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { ScreenControllerType } from "@/composables/screen-controller/screen-controller"
import ScreenControllerKey from "@/composables/screen-controller/screen-controller-key"

const { appUser, checkLoginState } = inject(AuthKey) as AuthType
const { screenShowable } = inject(ScreenControllerKey) as ScreenControllerType

const router = useRouter()

const showable = ref(false)

onMounted(async () => {
  await checkLoginState()
    .then(() => {
      if(appUser.value) {
        if(appUser.value.admin || appUser.value.approved || appUser.value.invited) {
          showable.value = true
        } else {
          router.replace('/apply')
        }
      } else {
        router.replace('/login')
      }
    })
})
</script>
