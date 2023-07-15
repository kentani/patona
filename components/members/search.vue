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
      <common-underlined-text
        text="表示オプション"
        class="text-caption mb-4"
      />

      <v-row
        dense
        no-gutters
      >
        <v-col
          cols="6"
          sm="12"
        >
          <v-switch
            v-model="showArchivedMember"
            inset
            hide-details
            density="compact"
            label="アーカイブ"
            color="green1"
            @change="onChangeShowArchivedMemberSwitch"
          ></v-switch>
        </v-col>

        <v-col
          cols="6"
          sm="12"
        >
          <v-switch
            v-model="showOtherMember"
            inset
            hide-details
            density="compact"
            label="担当以外"
            color="green1"
            @change="onChangeShowOtherMember"
          ></v-switch>
        </v-col>
      </v-row>

      <common-underlined-text
        text="検索"
        class="text-caption mt-2 mb-6"
      />

      <v-text-field
        v-model="searchMemberNameModel"
        variant="outlined"
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
const { filteredMembers, whereMember, filterMember, setSearchMemberName } = inject(MemberKey) as MemberType

const showArchivedMember = ref(false)
const showOtherMember = ref (false)
const searchMemberNameModel = ref('')

const onChangeShowArchivedMemberSwitch = async () => {
  await fetchMember()
}

const onChangeShowOtherMember = async () => {
  await fetchMember()
}

const onInputSearchMember = () => {
  setSearchMemberName(searchMemberNameModel.value)
  filterMember()
}

const fetchMember = async () => {
  if(showOtherMember.value) {
    await whereMember({
      gymId: gym.value?.id,
      includeArchive: showArchivedMember.value
    })
  } else {
    await whereMember({
      gymId: gym.value?.id,
      instructorIds: [instructor.value?.id],
      includeArchive: showArchivedMember.value
    })
  }

  filterMember()
}
</script>
