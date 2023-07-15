<template>
  <v-dialog
    v-model="dialog"
    persistent
    scrollable
    fullscreen
  >
    <v-card
      variant="flat"
      rounded="0"
      color="background"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          :text="isEdit ? '会員を編集' : '会員を追加'"
          class="text-body-1 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        <v-row
        >
          <v-col
            cols="12"
          >
            <v-text-field
              v-model="memberName"
              label="会員名"
              variant="outlined"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-text-field
              v-model="memberBirthDay"
              label="生年月日"
              placeholder="例）19910212 ※1991/2/12生まれの場合"
              variant="outlined"
              color="green1"
              type="tel"
              :rules="[rules.date]"
              density="compact"
              validate-on="blur"
            ></v-text-field>
          </v-col>

          <v-col
            cols="12"
          >
            <v-select
              v-model="memberGender"
              variant="outlined"
              :items="genders"
              item-title="title"
              item-value="id"
              label="性別"
              color="green1"
              :rules="[rules.required]"
              density="compact"
              @update:modelValue=""
            ></v-select>
          </v-col>

          <v-col
            cols="12"
          >
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
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberExperience"
              label="運動経験"
              variant="outlined"
              color="green1"
              type="tel"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberInjury"
              label="けが・病気"
              variant="outlined"
              color="green1"
              type="tel"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberPurpose"
              label="目的"
              variant="outlined"
              color="green1"
              type="tel"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberGoal"
              label="目標"
              variant="outlined"
              color="green1"
              type="tel"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>

          <v-col
            cols="12"
          >
            <v-textarea
              v-model="memberMemo"
              label="メモ"
              variant="outlined"
              color="green1"
              type="tel"
              density="compact"
              validate-on="blur"
            ></v-textarea>
          </v-col>
        </v-row>
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
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { appUser } = inject(AuthKey) as AuthType
const { gym } = inject(GymKey) as GymType
const { instructor, instructors } = inject(InstructorKey) as InstructorType
const { genders, createMember, filterMember } = inject(MemberKey) as MemberType

const isEdit = ref(false)
const dialog = ref(false)
const memberName = ref('')
const memberBirthDay = ref('')
const memberGender = ref(genders.value[0].id)
const memberInstructors = ref([instructor.value?.id])
const memberExperience = ref('')
const memberInjury = ref('')
const memberPurpose = ref('')
const memberGoal = ref('')
const memberMemo = ref('')

const rules = ref({
  required: (value: any) => !!value || '必須項目です',
  counter: (value: any) => value.length !== 8 || '入力形式が不正です',
  date: (value: any) => isValidDate(value) || '入力形式が不正です',
})
const isValidDate = (value: any) => {
  if(!value) return true

  const dateString = `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
  const day =  new Date(dateString)

  return !Number.isNaN(day.getTime())
}

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  if(isEdit.value) {

  } else {
    createMember({
      gymId: gym.value?.id,
      instructorId: instructor.value?.id,
      instructorIds: memberInstructors.value,
      archived: false,
      name: memberName.value,
      imageName: '',
      imageURL: '',
      detail: {
        birthday: memberBirthDay.value,
        genderId: memberGender.value,
        profiles: []
      },
    })
  }

  filterMember()
  close()
}

const open = (params: { isEdit: boolean }) => {
  isEdit.value = params.isEdit
  dialog.value = true
}

const close = () => {
  memberName.value = ''
  memberBirthDay.value = ''
  memberGender.value = genders.value[0].id
  memberInstructors.value = [instructor.value?.id]
  memberExperience.value = ''
  memberInjury.value = ''
  memberPurpose.value = ''
  memberGoal.value = ''
  memberMemo.value = ''
  dialog.value = false
}

defineExpose({
  open,
})
</script>
