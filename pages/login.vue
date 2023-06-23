<template>
  <v-container style="height: 100%;">
    <v-row
      dense
      justify="center"
      align="center"
      style="height: 100%;"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <v-btn
          size="large"
          rounded="lg"
          elevation="4"
          style="text-transform: none"
          @click="onClickGoogleLogin"
        >
          <v-icon left>
            mdi-google
          </v-icon>
          <span class="ml-2">Sign in with Google</span>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser, login, getLoginResult } = inject(AuthKey) as AuthType

const router = useRouter()

const onClickGoogleLogin = async () => {
  await login()
}

onMounted(async () => {
  await getLoginResult()

  if(appUser.value) {
    router.replace('/')
  }
})

definePageMeta({
  layout: 'login'
})
</script>
