<template>
<v-row>
  <v-col
    v-if="$vuetify.display.xs"
    cols="12"
  >
    <members-d-member-physical-data-date-selector />
  </v-col>

  <v-col
    cols="12"
    sm="8"
    md="8"
    lg="8"
  >
    <members-d-member-physical-data-card-list />
  </v-col>

  <v-col
    v-if="!$vuetify.display.xs"
    cols="12"
    sm="4"
    md="4"
    lg="4"
  >
    <members-d-member-physical-data-date-selector />
  </v-col>
</v-row>
</template>
