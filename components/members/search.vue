<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-title>
      <span class="text-body-1 text-grey">会員数</span>
      <span class="mx-2 text-h4 font-weight-bold text-green1">{{ filteredMembers.length }}</span>
    </v-card-title>

    <v-card-text>
      <v-switch
        v-model="showArchivedMember"
        inset
        hide-details
        density="compact"
        label="アーカイブ"
        color="green1"
        @change="onChangeShowArchivedMemberSwitch"
      ></v-switch>

      <!-- <v-switch
        v-model="showOtherMember"
        inset
        hide-details
        density="compact"
        label="担当以外"
        color="green1"
        @change="onInputSearchMember"
      ></v-switch> -->

      <v-text-field
        v-model="searchMemberName"
        variant="underlined"
        density="compact"
        placeholder="会員名を入力"
        color="green1"
        hide-details
        @input="onInputSearchMember"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"

const { gym } = inject(GymKey) as GymType
const { instructor } = inject(InstructorKey) as InstructorType
const { filteredMembers, whereMember, filterMember } = inject(MemberKey) as MemberType

const showArchivedMember = ref(false)

const searchMemberName = ref('')

const onChangeShowArchivedMemberSwitch = async () => {
  await whereMember({
    gymId: gym.value?.id,
    instructorId: instructor.value?.id,
    includeArchive: showArchivedMember.value
  })

  filterMember({ searchMemberName: searchMemberName.value })
}

const onInputSearchMember = () => {
  filterMember({ searchMemberName: searchMemberName.value })
}
</script>
