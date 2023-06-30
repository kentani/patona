<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card
      variant="flat"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          text="ジムを追加"
          class="text-body-1 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="gymName"
          label="ジム名"
          variant="underlined"
          hide-details
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          variant="text"
          @click="onClickCancel"
        >
          閉じる
        </v-btn>

        <v-btn
          variant="text"
          @click="onClickComplete"
        >
          完了
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { appUser } = inject(AuthKey) as AuthType
const { gym, whereGym, createGym } = inject(GymKey) as GymType
const { instructors, whereInstructor, createInstructor } = inject(InstructorKey) as InstructorType

const dialog = ref(false)
const gymName = ref('')

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  await createGym({ userId: appUser.value?.id, name: gymName.value })
  await createInstructor({ userId: appUser.value?.id, gymId: gym.value?.id, owner: true, name: appUser.value?.name })
  close()
}

const open = () => {
  dialog.value = true
}

const close = () => {
  gymName.value = ''
  dialog.value = false
}

defineExpose({
  open,
})
</script>
