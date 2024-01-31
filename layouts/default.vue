<template>
  <v-app v-show="showable" class="text-font">
    <common-app-bar />

    <v-main v-show="screenShowable">
      <slot />
    </v-main>

    <common-loading v-show="!screenShowable" />
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
const route = useRoute()

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
        router.replace({ path: '/login', query: { redirectPath: encodeURIComponent(route.fullPath) } })
      }
    })
})
</script>
