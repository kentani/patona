<template>
  <v-app-bar
    app
    fixed
    flat
    density="compact"
  >
    <v-toolbar-title class="mx-0">
      <v-row
        dense
        no-gutters
        align="center"
        class="px-2"
      >
        <v-col class="text-h6 text-left font-weight-bold">
          {{ title }}
        </v-col>

        <v-spacer />

        <v-col cols="auto" class="text-body-2 text-left font-weight-bold">
          サンプルジム
        </v-col>

        <v-col cols="auto" class="mx-1 text-body-2 text-left font-weight-bold">
          |
        </v-col>

        <v-col cols="auto" class="text-body-2 text-left font-weight-bold">
          {{ appUser?.name }}
        </v-col>
      </v-row>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser } = inject(AuthKey) as AuthType

const title = ref('PATONA')
</script>
