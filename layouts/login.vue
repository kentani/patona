<template>
  <v-app v-show="showable">
    <common-app-bar />

    <v-main>
      <slot />
    </v-main>
  </v-app>

  <v-app v-show="!showable">
    <common-loading />
  </v-app>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { appUser, getLoginResult, checkLoginState } = inject(AuthKey) as AuthType
const { instructors, whereInstructor } = inject(InstructorKey) as InstructorType

const router = useRouter()
const route = useRoute()

const showable = ref(false)

onMounted(async () => {
  await getLoginResult()
  await checkLoginState().then(async () => {
    let redirectPath: any = route.query.redirectPath ? decodeURIComponent(String(route.query.redirectPath)) : null

    if(appUser.value) {
      if(appUser.value.admin) {
        redirectPath = redirectPath || '/admin/menus'
        router.replace(redirectPath)
      } else if(appUser.value.approved || appUser.value.invited) {
        await whereInstructor({ userId: appUser.value?.id })
        if(instructors.value.length === 1) {
          redirectPath = redirectPath || { path: '/i/menus', query: { gymId: instructors.value[0].gymId } }
          router.replace(redirectPath)
        } else {
          redirectPath = redirectPath || '/i/gyms'
          router.replace(redirectPath)
        }
      } else {
        redirectPath = redirectPath || '/apply'
        router.replace(redirectPath)
      }
    } else {
      showable.value = true
    }
  })
})
</script>
