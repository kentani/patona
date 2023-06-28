<template>
  <v-container>
    <v-card variant="flat">
      <v-card-title>
        <div>{{ gym?.name }}</div>
      </v-card-title>

      <v-card-text>
        <div>招待リンク</div>
        <div>
          {{ invitationURL }}
          <v-icon @click="onClickCopy">mdi-content-copy</v-icon>
        </div>
      </v-card-text>
    </v-card>

  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { TrainingCategoryType } from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import { TrainingMenuType } from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"
import { DocumentData } from "@firebase/firestore"

const { appUser, onLoadedAppUser } = inject(AuthKey) as AuthType
const { gym, onLoadedGym } = inject(GymKey) as GymType
const { trainingCategories, whereTrainingCategory, createTrainingCategory } = inject(TrainingCategoryKey) as TrainingCategoryType
const { trainingMenus, whereTrainingMenu, createTrainingMenu } = inject(TrainingMenuKey) as TrainingMenuType

const invitationURL = ref('')

const onClickCopy = () => {
  navigator.clipboard.writeText(invitationURL.value)
}

onMounted(async () => {
  await onLoadedGym().then(async () => {
    invitationURL.value = `${window.location.origin}/invitation?gymId=${gym.value?.id}`
  })
})
</script>
