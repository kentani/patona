<template>
  <v-app-bar
    app
    fixed
    flat
    density="compact"
  >
    <v-toolbar-title class="mx-0">
      <v-row
        dense
        no-gutters
        class="px-2"
      >
        <div class="pt-1 pl-1 text-left font-weight-bold">
          {{ title }}
        </div>
      </v-row>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script setup lang="ts">
const title = ref('PATONA')
</script>
