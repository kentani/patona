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
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { appUser, checkLoginState } = inject(AuthKey) as AuthType
const { instructors, whereInstructor } = inject(InstructorKey) as InstructorType
const router = useRouter()

const showable = ref(false)

onMounted(async () => {
  await checkLoginState()
    .then(async () => {
      if(appUser.value) {
        if(appUser.value.admin) {
          router.replace('/admin/menus')
        } else if(appUser.value.approved || appUser.value.invited) {
          await whereInstructor({ userId: appUser.value?.id })
          if(instructors.value.length === 1) {
            router.replace({ path: '/i/menus', query: { gymId: instructors.value[0].gymId } })
          } else {
            router.replace('/i/gyms')
          }
        } else {
          showable.value = true
        }
      } else {
        router.replace('/login')
      }
    })
})
</script>
