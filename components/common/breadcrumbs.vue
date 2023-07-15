<template>
  <v-breadcrumbs
    :items="breadcrumbs"
    class="px-0 pt-1 text-body-2"
    color="green1"
    density="compact"

  >
    <template v-slot:divider>
      <v-icon icon="mdi-chevron-right"></v-icon>
    </template>
  </v-breadcrumbs>
</template>

<script setup lang="ts">
interface Props {
  breadcrumbs: Array<BreadcrumbsItem>
}

interface BreadcrumbsItem {
  id: string
  title: string
  to: string
  disabled: boolean
}

const Props = withDefaults(defineProps<Props>(), {
  breadcrumbs: () => []
})
</script>

<style>
.v-breadcrumbs-divider {
  padding: 0;
}
</style>
