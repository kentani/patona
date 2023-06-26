<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="6">
        <v-btn @click="onClickAddMember">
          顧客を追加
        </v-btn>
      </v-col>

      <v-dialog
        v-model="dialog"
      >
        <v-card
          variant="flat"
        >
          <v-card-text>
            <v-text-field
              v-model="name"
              label="顧客名"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="text"
              @click="onClickCancelAddMember"
            >
              閉じる
            </v-btn>

            <v-btn
              variant="text"
              @click="onClickCompleteAddMember"
            >
              完了
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row
      justify="start"
      align="center"
    >
      <v-col
        v-for="member in members"
        :key="member.id"
        cols="12"
        sm="4"
        lg="3"
      >
        <v-card
          rounded="lg"
          :ripple="false"
          @click="onClickMember(member)"
        >

          <v-card-title>
            <div>
              {{ member.name }}
            </div>
          </v-card-title>

          <v-card-text class="text-body-1 text-left">
            <v-list-group>
              <v-list-item>

              </v-list-item>
            </v-list-group>
            <div>userId: {{ member.instructorId }}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
import { ScreenControllerType } from "@/composables/screen-controller/screen-controller"
import ScreenControllerKey from "@/composables/screen-controller/screen-controller-key"

const { appUser, onLoadedAppUser } = inject(AuthKey) as AuthType
const { gym, findGym } = inject(GymKey) as GymType
const { instructor, findInstructor } = inject(InstructorKey) as InstructorType
const { members, whereMember, createMember } = inject(MemberKey) as MemberType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const router = useRouter()
const route = useRoute()

const dialog = ref(false)
const name = ref('')

const onClickAddMember = () => {
  dialog.value = true
}

const onClickCompleteAddMember = async () => {
  await createMember({
    gymId: String(route.query.gymId),
    instructorId: instructor.value?.id,
    archived: false,
    name: name.value,
    imageName: '',
    imageURL: '',
    detail: { profiles: [] }
  })
  await whereMember({ gymId: String(route.query.gymId), instructorId: instructor.value?.id })
  name.value = ''
  dialog.value = false
}

const onClickCancelAddMember = async () => {
  name.value = ''
  dialog.value = false
}

const onClickMember = (member: any) => {
  router.push({ path: '/i/members/d/personal-data', query: { memberId: member.id } })
}

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    await findGym({ id: String(route.query.gymId) })
    await findInstructor({ userId: appUser.value?.id, gymId: String(route.query.gymId) })

    if(!gym.value || (!appUser.value?.admin && !instructor.value)) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }

    await whereMember({ gymId: String(route.query.gymId), instructorId: instructor.value?.id })
  })

  show()
})
</script>
