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
      class="text-font"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          :text="isEdit ? '会員を編集' : '会員を追加'"
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
              ※必須(生年月日以外)
            </span>
          </v-col>

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
              :rules="[rules.required]"
              density="compact"
              multiple
              @update:modelValue=""
            ></v-select>
          </v-col>

          <v-col
            cols="12"
          >
            <common-underlined-text
              text="目的/目標"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-grey font-weight-bold"
            >
              ※任意
            </span>
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
            <common-underlined-text
              text="その他"
              class="text-body-2 font-weight-bold"
            />

            <span
              class="text-caption text-grey font-weight-bold"
            >
              ※任意
            </span>
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
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { appUser } = inject(AuthKey) as AuthType
const { gym } = inject(GymKey) as GymType
const { instructor, instructors } = inject(InstructorKey) as InstructorType
const { member, genders, profiles, createMember, updateMember, filterMember } = inject(MemberKey) as MemberType

const isEdit = ref(false)
const dialog = ref(false)
const memberName = ref('')
const memberBirthDay = ref('')
const memberGender = ref('')
const memberInstructors: Ref<Array<any>> = ref([])
const memberPurpose = ref('')
const memberGoal = ref('')
const memberExperience = ref('')
const memberInjury = ref('')
const memberMemo = ref('')

const rules = ref({
  required: (value: any) => (!!value && value.length) || '必須項目です',
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
    await updateMember(member.value?.id, {
      instructorIds: memberInstructors.value,
      name: memberName.value,
      imageName: '',
      imageURL: '',
      detail: {
        birthday: memberBirthDay.value,
        genderId: memberGender.value,
        profiles: [
          { profileId: profiles.value[0].id, data: memberPurpose.value },
          { profileId: profiles.value[1].id, data: memberGoal.value },
          { profileId: profiles.value[2].id, data: memberExperience.value },
          { profileId: profiles.value[3].id, data: memberInjury.value },
          { profileId: profiles.value[4].id, data: memberMemo.value },
        ]
      },
    })
  } else {
    await createMember({
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
        profiles: [
          { profileId: profiles.value[0].id, data: memberPurpose.value },
          { profileId: profiles.value[1].id, data: memberGoal.value },
          { profileId: profiles.value[2].id, data: memberExperience.value },
          { profileId: profiles.value[3].id, data: memberInjury.value },
          { profileId: profiles.value[4].id, data: memberMemo.value },
        ]
      },
    })

    filterMember()
  }

  close()
}

const setMemberProfile = (member: any) => {
  let memberProfile: any = {}

  member?.detail?.profiles.forEach((profile: any) => {
    switch(profile.profileId) {
      case profiles.value[0].id:
        memberProfile.memberPurpose = profile.data
        break
      case profiles.value[1].id:
        memberProfile.memberGoal = profile.data
        break
      case profiles.value[2].id:
        memberProfile.memberExperience = profile.data
        break
      case profiles.value[3].id:
        memberProfile.memberInjury = profile.data
        break
      case profiles.value[4].id:
        memberProfile.memberMemo = profile.data
        break
    }
  })

  return memberProfile
}

const open = (params: { isEdit: boolean, member: any }) => {
  const { member } = params

  const memberProfile = setMemberProfile(member)

  isEdit.value = params.isEdit
  memberName.value = member?.name
  memberBirthDay.value = member?.detail?.birthday
  memberGender.value = member?.detail?.genderId || genders.value[0].id
  memberInstructors.value = member?.instructorIds || [instructor.value?.id]
  memberPurpose.value = memberProfile.memberPurpose || ''
  memberGoal.value = memberProfile.memberGoal || ''
  memberExperience.value = memberProfile.memberExperience || ''
  memberInjury.value = memberProfile.memberInjury || ''
  memberMemo.value = memberProfile.memberMemo || ''
  dialog.value = true
}

const close = () => {
  isEdit.value = false
  memberName.value = ''
  memberBirthDay.value = ''
  memberGender.value = genders.value[0].id
  memberInstructors.value = [instructor.value?.id]
  memberPurpose.value = ''
  memberGoal.value = ''
  memberExperience.value = ''
  memberInjury.value = ''
  memberMemo.value = ''
  dialog.value = false
}

defineExpose({
  open,
})
</script>
