<template>
  <v-app>
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

    <v-main>
      <v-container>
        <v-card>
          <v-card-title>
            Vuetify
          </v-card-title>

          <v-card-actions>
            <v-spacer />

            <v-btn>
              <v-icon>
                mdi-close
              </v-icon>Close
            </v-btn>

            <v-btn>
              <v-icon>
                mdi-circle
              </v-icon>Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
const title = ref('PATONA')
</script>
