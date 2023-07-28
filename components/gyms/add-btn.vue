<template>
  <v-btn
    icon
    variant="outlined"
    color="green1"
    size="x-small"
    :disabled="addableGym"
    @click="onClickAddGym"
  >
    <v-icon
      icon="mdi-plus"
      size="x-large"
    ></v-icon>
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
