<template>
  <v-container>
    <v-card variant="flat">
      <v-card-title>
        Root Page
      </v-card-title>

      <v-card-text>
        <div>id: {{ appUser?.id }}</div>
        <div>name: {{ appUser?.name }}</div>
        <div>admin: {{ appUser?.admin }}</div>
        <div>approved: {{ appUser?.approved }}</div>
        <div>invited: {{ appUser?.invited }}</div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn>
          <v-icon>
            mdi-close
          </v-icon>Close
        </v-btn>

        <v-btn>
          <v-icon>
            mdi-circle
          </v-icon>Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser } = inject(AuthKey) as AuthType
</script>
