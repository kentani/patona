<template>
  <v-btn
    variant="outlined"
    color="green1"
    rounded="lg"
    :ripple="false"
    :disabled="!addableGym"
    block
    @click="onClickAddGym"
  >
    <v-icon
      size="large"
      icon="mdi-plus"
    ></v-icon>ジムを追加
  </v-btn>

  <gyms-form
    ref="form"
  />
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"

const { appUser } = inject(AuthKey) as AuthType

const form = ref()

const addableGym = computed(() => {
  const creatableGymCount = appUser.value?.creatableGymCount - appUser.value?.createdGymCount
  return !!creatableGymCount
})

const onClickAddGym = () => {
  form.value.open()
}
</script>
