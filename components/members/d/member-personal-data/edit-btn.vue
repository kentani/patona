<template>
  <v-btn
    variant="outlined"
    rounded="lg"
    color="green1"
    block
    :ripple="false"
    @click="onClickEdit"
  >
    <v-icon
      icon="mdi-pencil"
    ></v-icon>
    <span class="">編集</span>
  </v-btn>

  <members-d-member-personal-data-form
    ref="form"
  />
</template>

<script setup lang="ts">
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { member, setMember } = inject(MemberKey) as MemberType

const form = ref()

const onClickEdit = () => {
  form.value.open({ isEdit: true })
}
</script>
