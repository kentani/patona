<template>
  <v-btn
    :variant="variant"
    color="green1"
    rounded="lg"
    :ripple="false"
    block
    @click="onClickAddBtn"
  >
    <v-icon
      size="large"
      icon="mdi-plus"
    ></v-icon>会員を追加
  </v-btn>

  <members-d-member-personal-data-form
    ref="form"
  />
</template>

<script setup lang="ts">
interface Props {
  variant?: NonNullable<"outlined" | "flat" | "text" | "elevated" | "tonal" | "plain"> | undefined
}

const Props = withDefaults(defineProps<Props>(), {
  variant: 'outlined',
})

const form = ref()

const onClickAddBtn = () => {
  form.value.open({ isEdit: false })
}
</script>
