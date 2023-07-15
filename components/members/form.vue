<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
    persistent
  >
    <v-card
      variant="flat"
      rounded="lg"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          text="会員を追加"
          class="text-body-1 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-text-field
          v-model="memberName"
          variant="outlined"
          color="green1"
          label="会員名"
          density="compact"
        ></v-text-field>

        <v-select
          v-model="memberInstructors"
          variant="outlined"
          :items="instructors"
          item-title="name"
          item-value="id"
          label="担当"
          color="green1"
          density="compact"
          multiple
          @update:modelValue=""
        ></v-select>
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
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"

const { gym } = inject(GymKey) as GymType
const { instructor, instructors } = inject(InstructorKey) as InstructorType
const { createMember, filterMember } = inject(MemberKey) as MemberType

const dialog = ref(false)
const memberName = ref('')
const memberInstructors = ref([])

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  await createMember({
    gymId: gym.value?.id,
    instructorId: instructor.value?.id,
    instructorIds: memberInstructors.value,
    archived: false,
    name: memberName.value,
    imageName: '',
    imageURL: '',
    detail: {
      birthday: '',
      gender: '',
      profiles: []
    },
  })

  filterMember()
  close()
}

const open = () => {
  dialog.value = true
}

const close = () => {
  memberName.value = ''
  memberInstructors.value = []
  dialog.value = false
}

defineExpose({
  open,
})
</script>
