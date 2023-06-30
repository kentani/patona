<template>
  <v-container>
    <common-breadcrumbs
      :breadcrumbs="breadcrumbs"
    />

    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <v-row>
          <v-col cols="12">
            <members-search />
          </v-col>

          <v-col cols="12">
            <members-add-btn />
          </v-col>
        </v-row>

      </v-col>

      <v-col
        cols="12"
        sm="8"
        md="9"
      >
        <members-list />
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
const { instructor, findInstructor, whereInstructor } = inject(InstructorKey) as InstructorType
const { whereMember, filterMember } = inject(MemberKey) as MemberType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const router = useRouter()
const route = useRoute()

const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: false },
  { id: '2', title: 'メニュー', to: `/i/menus?gymId=${route.query.gymId}`, disabled: false },
  { id: '3', title: '顧客一覧', to: `/i/members?gymId=${route.query.gymId}`, disabled: true },
])

const onClickMember = (member: any) => {
  router.push({ path: '/i/members/d/member-personal-data', query: { memberId: member.id } })
}

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    await findGym({ id: String(route.query.gymId) })
    await findInstructor({ userId: appUser.value?.id, gymId: String(route.query.gymId) })

    if(!gym.value || (!appUser.value?.admin && !instructor.value)) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }

    await whereInstructor({ gymId: String(route.query.gymId) })
    await whereMember({ gymId: String(route.query.gymId), instructorId: instructor.value?.id })

    filterMember({ searchMemberName: '' })
  })

  show()
})
</script>
