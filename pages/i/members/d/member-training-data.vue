<template>
  <v-row>
    <v-col
      v-if="$vuetify.display.xs"
      cols="12"
    >
      <members-d-member-training-data-calender />
    </v-col>

    <v-col
      cols="12"
      sm="8"
      md="8"
      lg="8"
    >
      <members-d-member-training-data-menu-list />
    </v-col>

    <v-col
      v-if="!$vuetify.display.xs"
      cols="12"
      sm="4"
      md="4"
      lg="4"
    >
      <members-d-member-training-data-calender />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"
import { TrainingType } from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"

const { gym, onLoadedGym } = inject(GymKey) as GymType
const { member, onLoadedMember } = inject(MemberKey) as MemberType
const { whereTrainingCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { whereTrainingMenu } = inject(TrainingMenuKey) as TrainingMenuType
const { whereTraining } = inject(TrainingKey) as TrainingType

onMounted(async () => {
  await onLoadedGym().then(async () => {
    whereTrainingCategory({ gymId: gym.value?.id  })
    whereTrainingMenu({ gymId: gym.value?.id  })

    onLoadedMember().then(async () => {
      whereTraining({ gymId: gym.value?.id, memberId: member.value?.id })
    })
  })
})
</script>
