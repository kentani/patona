<template>
  <v-btn
    variant="outlined"
    rounded="lg"
    color="error"
    block
    @click="onClickDelete"
  >
    <v-icon
      icon="mdi-delete"
    ></v-icon>
    <span class="">削除</span>
  </v-btn>

  <members-d-member-personal-data-delete-form
    ref="form"
  />
</template>

<script setup lang="ts">
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { member } = inject(MemberKey) as MemberType

const form = ref()

const onClickDelete = () => {
  form.value.open({ member: member.value })
}
</script>
