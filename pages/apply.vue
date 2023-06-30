<template>
  <v-container
    style="height: 100%;"
  >
    <v-row
      dense
      no-gutters
      justify="center"
      align="center"
      style="height: 100%;"
    >
      <v-col
        cols="auto"
        class="text-center"
      >
        <v-card
          variant="flat"
          rounded="lg"
        >

          <v-card-title
            class="my-3"
          >
            <common-underlined-text
              text="ようこそ"
              class="text-h6 font-weight-bold"
            />
          </v-card-title>

          <v-card-text>
            <div class="text-center text-body-1">
              管理者の承認、またはオーナーからの招待が必要です
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'apply'
})
</script>
