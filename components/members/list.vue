<template>
  <v-row
    justify="start"
    align="center"
  >
    <v-col
      v-for="member in filteredMembers"
      :key="member.id"
      cols="6"
      sm="4"
      lg="3"
    >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card
            v-bind="props"
            variant="elevated"
            rounded="lg"
            :ripple="false"
            :elevation="isHovering ? 6 : 2"
            @click="onClickMember(member)"
          >
            <v-img
              height="140"
              position="top center"
              :src="member.imageUrl || defaultImage"
              cover
            >
              <div
                v-if="member.archived"
                class="font-weight-bold text-body-1 text-white"
                style="background: rgb(var(--v-theme-green1)); opacity: 0.8; height: 140px; position: relative;"
              >
                <div style="position: absolute; top: 45%; left: 20%;">アーカイブ済み</div>
              </div>
            </v-img>

            <v-card-title class="py-0 text-body-1 font-weight-bold">
              <div>
                {{ member.name }}
              </div>
            </v-card-title>

            <v-card-text class="text-body-2 text-left">
              <div>担当: {{ instructorName(member.instructorId) }}</div>
              <div>登録日: {{ formattedDate(member.createdAt) }}</div>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { instructors } = inject(InstructorKey) as InstructorType
const { filteredMembers } = inject(MemberKey) as MemberType

const router = useRouter()

const defaultImage = ref('/images/account.png')

const onClickMember = (member: any) => {
  router.push({ path: '/i/members/d', query: { memberId: member.id } })
}

const instructorName = (instructorId: number) => {
  const instructor = instructors.value.find(i => i.id === instructorId)
  return instructor?.name || ''
}

const formattedDate = (timestamp: any) => {
  return format(timestamp.toDate(), 'yyyy-MM-dd')
}
</script>
