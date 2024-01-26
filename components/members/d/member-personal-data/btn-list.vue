<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-text
      class="pa-0"
    >
      <v-row
        dense
      >
        <v-col
          cols="4"
          sm="4"
          md="4"
          lg="4"
        >
          <members-d-member-personal-data-edit-btn />
        </v-col>

        <v-col
          cols="4"
          sm="4"
          md="4"
          lg="4"
        >
          <members-d-member-personal-data-archive-btn />
        </v-col>

        <v-col
          cols="4"
          sm="4"
          md="4"
          lg="4"
        >
          <members-d-member-personal-data-delete-btn />
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
</script>
