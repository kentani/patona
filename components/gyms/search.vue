<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-title>
      <span class="text-body-1 text-grey">ジム数</span>
      <span class="mx-2 text-h4 font-weight-bold text-green1">{{ gyms.length }}</span>
    </v-card-title>

    <v-card-text>
      <v-text-field
        v-model="searchGymName"
        variant="underlined"
        density="compact"
        placeholder="ジム名を入力"
        color="green1"
        hide-details
        @input="onInputSearchGym"
      ></v-text-field>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"

const { gyms, filterGym } = inject(GymKey) as GymType

const searchGymName = ref('')

const onInputSearchGym = () => {
  filterGym({ searchGymName: searchGymName.value })
}
</script>
