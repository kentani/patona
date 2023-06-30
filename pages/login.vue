<template>
  <v-container style="height: 100%;">
    <v-row
      dense
      no-gutters
      justify="center"
      align="center"
      style="height: 100%;"
    >
      <v-col
        cols="auto"
        class="text-center"
      >
        <v-card
          variant="flat"
          rounded="lg"
        >
          <v-card-title
            class="my-3"
          >
            <common-underlined-text
              text="ログイン"
              class="text-h6 font-weight-bold"
            />
          </v-card-title>

          <v-card-text>
            <div
              class="pb-4"
            >
              Googleアカウントでログインして、ご利用を開始してください。
            </div>

            <v-btn
              variant="outlined"
              rounded="lg"
              color="green1"
              style="text-transform: none"
              @click="onClickGoogleLogin"
            >
              <v-icon left>
                mdi-google
              </v-icon>
              <span class="ml-2">Sign in with Google</span>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { login } = inject(AuthKey) as AuthType

const onClickGoogleLogin = async () => {
  await login()
}

definePageMeta({
  layout: 'login'
})
</script>
