<template>
  <v-btn
    variant="outlined"
    rounded="lg"
    color="font"
    block
    @click="onClickArchive"
  >
    <v-icon
      icon="mdi-archive"
    ></v-icon>
    <span class="">{{ member?.archived ? "解除": "アーカイブ" }}</span>
  </v-btn>

  <members-d-member-personal-data-archive-form
    ref="form"
  />
</template>

<script setup lang="ts">
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { member } = inject(MemberKey) as MemberType

const form = ref()

const onClickArchive = () => {
  form.value.open({ member: member.value })
}
</script>
