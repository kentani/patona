<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-text>
      <v-row
        dense
      >
        <v-col
          cols="4"
          sm="12"
          md="12"
          lg="12"
        >
          <members-d-member-personal-data-edit-btn />
        </v-col>

        <v-col
          cols="4"
          sm="12"
          md="12"
          lg="12"
        >
          <v-btn
            variant="outlined"
            rounded="lg"
            color="font"
            block
            disabled
            @click=""
          >
            <v-icon
              icon="mdi-archive"
            ></v-icon>
            <span class="">アーカイブ</span>
          </v-btn>
        </v-col>

        <v-col
          cols="4"
          sm="12"
          md="12"
          lg="12"
        >
      <v-btn
        variant="outlined"
        rounded="lg"
        color="red"
        block
        disabled
        @click=""
      >
        <v-icon
          icon="mdi-delete"
        ></v-icon>
        <span class="">削除</span>
      </v-btn>
    </v-col>
  </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
</script>
