<template>
  <v-dialog
    v-model="dialog"
    max-width="600"
    :fullscreen="$vuetify.display.xs"
    scrollable
    persistent
  >
    <v-card
      variant="flat"
      :rounded="$vuetify.display.xs ? 0 : 'lg'"
      color="background"
      class="text-font"
    >
      <v-card-title
        class="ma-2"
      >
        <common-underlined-text
          text="トレーニングメニューの削除"
          class="text-h6 font-weight-bold"
        />
      </v-card-title>

      <v-card-text>
        トレーニングメニューを削除しますか？
      </v-card-text>

      <v-card-actions>
        <v-spacer />

        <v-btn
          rounded="lg"
          class="text-grey"
          :ripple="false"
          size="large"
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>

        <v-btn
          color="error"
          class="font-weight-bold"
          rounded="lg"
          :ripple="false"
          size="large"
          @click="onClickComplete"
        >
          削除
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { TrainingType } from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"

const { whereTraining, deleteTraining } = inject(TrainingKey) as TrainingType

const route = useRoute()

const dialog = ref(false)
const trainingModel: Ref<any> = ref(null)

const onClickCancel = async () => {
  close()
}

const onClickComplete = async () => {
  await deleteTraining(trainingModel.value?.id)

  await whereTraining({
    gymId: route.query.gymId,
    memberId: route.query.memberId,
  })

  dialog.value = false
}

const open = (params: { training: any }) => {
  const { training } = params
  trainingModel.value = training
  dialog.value = true
}

const close = () => {
  trainingModel.value = null
  dialog.value = false
}

defineExpose({
  open,
})
</script>
