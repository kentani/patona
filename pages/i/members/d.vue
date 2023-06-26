<template>
  <v-container class="pt-0">
    <v-breadcrumbs
      :items="breadcrumbs"
      class="px-0 pt-1"
    >
      <template v-slot:divider>
        <v-icon icon="mdi-chevron-right"></v-icon>
      </template>
    </v-breadcrumbs>

    <v-row>
      <v-col
        v-for="tab in tabs"
        :key="tab.id"
        cols="auto"
      >
        <v-btn
          variant="text"
          @click=onClickTab(tab)
        >
          {{ tab.name }}
        </v-btn>
      </v-col>
    </v-row>

    <NuxtPage page-key="member" />
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

const { onLoadedAppUser } = inject(AuthKey) as AuthType
const { gym, findGym } = inject(GymKey) as GymType
const { instructor, findInstructor } = inject(InstructorKey) as InstructorType
const { member, findMember } = inject(MemberKey) as MemberType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const router = useRouter()
const route = useRoute()

const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: false },
  { id: '2', title: 'メニュー', to: `/i/menus?gymId=${member.value?.gymId}`, disabled: false },
  { id: '3', title: '顧客一覧', to: `/i/members?gymId=${member.value?.gymId}`, disabled: false },
  { id: '4', title: member.value?.name, to: `/i/members/d/member-personal-data?memberId=${route.query.memberId}`, disabled: true },
])
const tabs = ref([
{ id: '1', name: 'パーソナルデータ', to: 'personal-data', active: false },
{ id: '2', name: 'トレーニング履歴', to: 'training-data', active: false },
{ id: '3', name: '身体数値', to: 'physical-data', active: false },
{ id: '4', name: '身体画像', to: 'physical-image', active: false },
])

const onClickTab = (tab: any) => {
  router.push({ path: `/i/members/d/member-${tab.to}`, query: { memberId: route.query.memberId } })
}

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    await findMember({ id: String(route.query.memberId) })

    if(!member.value) {
      throw createError({ statusCode: 404, statusMessage: 'Page Not Found', fatal: true })
    }
  })

  show()
})
</script>
