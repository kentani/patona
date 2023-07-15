<template>
  <v-row>
    <v-col
      cols="12"
      class="d-block d-sm-none"
    >
      <members-d-member-personal-data-btn-list />
    </v-col>

    <v-col
      cols="12"
      sm="9"
      md="9"
      lg="9"
    >
      <members-d-member-personal-data-card />
    </v-col>

    <v-col
      cols="12"
      sm="3"
      md="3"
      lg="3"
      class="d-none d-sm-block"
    >
      <members-d-member-personal-data-btn-list />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const fab = ref(false)
</script>
