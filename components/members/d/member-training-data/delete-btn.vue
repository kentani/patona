<template>
  <v-btn
    variant="outlined"
    rounded="lg"
    color="error"
    block
    @click="onClickDeleteMenu"
  >
    <v-icon
      icon="mdi-delete"
    ></v-icon>
    <span class="">削除</span>
  </v-btn>

  <members-d-member-training-data-delete-form
    ref="trainingDataForm"
  />
</template>

<script setup lang="ts">
interface Props {
  training: any
}

const Props = withDefaults(defineProps<Props>(), {
  training: () => {}
})

const trainingDataForm = ref()

const onClickDeleteMenu = () => {
  trainingDataForm.value.open({ training: Props.training })
}
</script>
