<template>
  <v-btn
    icon
    variant="outlined"
    color="green1"
    size="x-small"
    @click="onClickAddBtn"
  >
    <v-icon
      icon="mdi-plus"
      size="x-large"
    ></v-icon>
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
