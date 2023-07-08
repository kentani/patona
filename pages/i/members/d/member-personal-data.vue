<template>
  <v-row>
    <v-col
      cols="9"
    >
      <members-d-member-personal-data-card />
    </v-col>

    <v-col
      cols="3"
    >
      <v-card
        variant="flat"
        rounded="lg"
      >
        <v-card-text>
          <members-d-member-personal-data-btn-list />
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { member, profiles } = inject(MemberKey) as MemberType

const defaultImage = ref('/images/account.png')
</script>
