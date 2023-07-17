<template>
  <v-row>
    <v-col
      cols="12"
      class="d-block d-sm-none"
    >
      <members-d-member-training-data-calender />
    </v-col>

    <v-col
      cols="12"
      sm="8"
      md="8"
      lg="8"
    >
      <members-d-member-training-data-menu-list />
    </v-col>

    <v-col
      cols="12"
      sm="4"
      md="4"
      lg="4"
      class="d-none d-sm-block"
    >
      <members-d-member-training-data-calender />
    </v-col>
  </v-row>
</template>

<script setup lang="ts">

</script>
