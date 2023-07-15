<template>
  <v-row
    justify="start"
    align="center"
  >
    <v-col
      v-for="member in filteredMembers"
      :key="member.id"
      cols="6"
      md="4"
    >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card
            class="pb-2"
            v-bind="props"
            variant="elevated"
            rounded="lg"
            :ripple="false"
            :elevation="isHovering ? 6 : 2"
            @click="onClickMember(member)"
          >
            <v-img
              max-height="180"
              aspect-ratio="1/1"
              :src="member.imageUrl || defaultImage"
              cover
            >
              <div
                v-if="member.archived"
                class="font-weight-bold text-body-1 text-white d-flex justify-center align-center"
                style="background: rgb(var(--v-theme-green1)); opacity: 0.8; height: 100%; position: relative; align-self: center;"
              >
                <div>アーカイブ済み</div>
              </div>
            </v-img>

            <v-card-title class="py-2 text-h6 font-weight-bold">
              <div>
                {{ member.name }}
              </div>
            </v-card-title>

            <v-card-text class="py-0 text-body-2 text-left">
              <common-accent-block
                title="担当"
                :text="instructorName(member)"
                class="py-2"
              />

              <common-accent-block
                title="登録日"
                :text="formattedDate(member.createdAt)"
                class="py-2"
              />
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
  router.push({ path: '/i/members/d/member-personal-data', query: { gymId: member.gymId, memberId: member.id } })
}

const instructorName = (member: any) => {
  const instructorId = member.instructorIds[0]
  const instructor = instructors.value.find(i => i.id === instructorId)

  let name = instructor?.name || ''

  if(otherInstructorCount(member)) {
    name = name + `・他${otherInstructorCount(member)}名`
  }

  return name
}

const otherInstructorCount = (member: any) => {
  return member.instructorIds.length - 1
}

const formattedDate = (timestamp: any) => {
  return format(timestamp.toDate(), 'yyyy-MM-dd')
}
</script>
