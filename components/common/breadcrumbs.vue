<template>
  <v-breadcrumbs
    class="px-0 pt-1"
    color="green1"
    :items="breadcrumbs"
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
