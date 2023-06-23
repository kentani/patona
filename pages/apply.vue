<template>
  <v-container>
    <v-row
      dense
      justify="center"
      align="center"
    >
      <v-col
        cols="12"
        class="text-center"
      >
        <v-card
          variant="flat"
        >
          <v-card-text>
            <div class="text-left">
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
