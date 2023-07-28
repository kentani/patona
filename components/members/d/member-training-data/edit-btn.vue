<template>
  <v-btn
    variant="outlined"
    rounded="lg"
    color="green1"
    block
    @click="onClickEditMenu"
  >
    <v-icon
      icon="mdi-archive"
    ></v-icon>

    <span class="">
      編集
    </span>
  </v-btn>

  <members-d-member-training-data-form
    ref="trainingDataForm"
  />
</template>

<script setup lang="ts">
import { TrainingType } from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"

const { currentTraining } = inject(TrainingKey) as TrainingType

const emit = defineEmits(['click-edit-menu'])

const trainingDataForm = ref()

const onClickEditMenu = () => {
  emit('click-edit-menu')
  trainingDataForm.value.open({ isEdit: true })
}
</script>
