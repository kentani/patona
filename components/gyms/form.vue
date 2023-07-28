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
          text="ジムを追加"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-row>
          <v-col
            cols="12"
          >
            <common-underlined-text
              text="基本情報"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-error font-weight-bold"
            >
              ※必須
            </span>
          </v-col>

          <v-col
            cols="12"
          >
          <v-text-field
            v-model="gymName"
            label="ジム名"
            type="text"
            variant="outlined"
            density="compact"
            color="green1"
            validate-on="blur"
            :rules="[rules.required]"
          ></v-text-field>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          rounded="lg"
          class="text-grey"
          :ripple="false"
          size="large"
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>

        <v-btn
          color="green1"
          class="font-weight-bold"
          rounded="lg"
          :ripple="false"
          size="large"
          @click="onClickComplete"
        >
          保存
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

const { appUser, updateUser } = inject(AuthKey) as AuthType
const { gym, createGym, filterGym } = inject(GymKey) as GymType
const { createInstructor } = inject(InstructorKey) as InstructorType

const dialog = ref(false)
const gymName = ref('')

const rules = ref({
  required: (value: any) => isRequired(value) || '必須項目です',
})

const isRequired = (value: any) => {
  if(!value) return false

  if(Array.isArray(value)) return !!value.length

  if(typeof value === 'object') return !!Object.keys(value).length

  return !!value.length
}

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  await createGym({ userId: appUser.value?.id, name: gymName.value })
  const createdGymCount = appUser.value?.createdGymCount + 1
  await updateUser(appUser.value?.id, { createdGymCount: createdGymCount })
  await createInstructor({ userId: appUser.value?.id, gymId: gym.value?.id, owner: true, name: appUser.value?.name })

  filterGym()
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
