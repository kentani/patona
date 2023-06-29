<template>
  <v-btn
    variant="outlined"
    color="green1"
    rounded="lg"
    :ripple="false"
    block
    @click="onClickAddGym"
  >
    <v-icon
      size="large"
      icon="mdi-plus"
    ></v-icon>ジムを追加
  </v-btn>

  <v-dialog
    v-model="dialog"
  >
    <v-card
      variant="flat"
    >
      <v-card-text>
        <v-text-field
          v-model="gymName"
          label="ジム名"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          variant="text"
          @click="onClickCancelAddGym"
        >
          閉じる
        </v-btn>

        <v-btn
          variant="text"
          @click="onClickCompleteAddGym"
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

const onClickAddGym = () => {
  openDialog()
}

const onClickCancelAddGym = async () => {
  closeDialog()
}

const onClickCompleteAddGym = async () => {
  await createGym({ userId: appUser.value?.id, name: gymName.value })
  await createInstructor({ userId: appUser.value?.id, gymId: gym.value?.id, owner: true, name: appUser.value?.name })
  await whereInstructor({ userId: appUser.value?.id })
  await whereGym({ ids: instructors.value.map(i => i.gymId) })
  closeDialog()
}

const openDialog = () => {
  dialog.value = true
}

const closeDialog = () => {
  gymName.value = ''
  dialog.value = false
}
</script>
