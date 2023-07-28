<template>
  <v-container
    fluid
  >
    <common-breadcrumbs
      :breadcrumbs="breadcrumbs"
      class="mb-2"
    />

    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="3"
      >
        <common-tabs
          base-url="/i/members/d/member-"
          :tabs="tabs"
        />
      </v-col>

      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="9"
      >
        <NuxtPage page-key="member" />
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
const { instructor, whereInstructor, findInstructor } = inject(InstructorKey) as InstructorType
const { member, findMember } = inject(MemberKey) as MemberType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const route = useRoute()

const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: false },
  { id: '2', title: 'メニュー', to: `/i/menus?gymId=${route.query.gymId}`, disabled: false },
  { id: '3', title: '会員一覧', to: `/i/members?gymId=${route.query.gymId}`, disabled: false },
  { id: '4', title: '会員詳細', to: '', disabled: true },
])

const tabs = ref([
  { id: '1', title: 'パーソナルデータ', to: 'personal-data', disabled: false, cols: 6, sm: 3, md: 3, lg: 12 },
  { id: '2', title: 'トレーニング履歴', to: 'training-data', disabled: false, cols: 6, sm: 3, md: 3, lg: 12 },
  { id: '3', title: '身体数値', to: 'physical-data', disabled: true, cols: 6, sm: 3, md: 3, lg: 12 },
  { id: '4', title: '身体画像', to: 'physical-image', disabled: true, cols: 6, sm: 3, md: 3, lg: 12 },
])

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    await findGym({ id: String(route.query.gymId) })

    if(!gym.value) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }

    await findInstructor({ userId: appUser.value?.id, gymId: String(route.query.gymId) })

    if(!appUser.value?.admin && !instructor.value) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }

    await findMember({ id: String(route.query.memberId) })

    if(!member.value) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }

    await whereInstructor({ gymId: String(route.query.gymId) })
  })

  show()
})
</script>
