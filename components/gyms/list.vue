<template>
  <v-row
    justify="start"
    align="center"
  >
    <v-col
      v-for="gym in filteredGyms"
      :key="gym.id"
      cols="12"
      sm="6"
      lg="4"
    >
      <v-hover>
        <template v-slot:default="{ isHovering, props }">
          <v-card
            v-bind="props"
            variant="elevated"
            rounded="lg"
            :ripple="false"
            :elevation="isHovering ? 6 : 2"
            @click="onClickGym(gym)"
          >

            <v-card-title>
              <div>
                {{ gym.name }}
              </div>
            </v-card-title>

            <v-card-text class="text-body-1 text-left">
              <div>作成日: {{ formattedDate(gym.createdAt) }}</div>
            </v-card-text>
          </v-card>
        </template>
      </v-hover>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { format } from 'date-fns'

import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"

const { filteredGyms } = inject(GymKey) as GymType

const router = useRouter()

const onClickGym = (gym: any) => {
  router.push({ path: '/i/menus', query: { gymId: gym.id } })
}

const formattedDate = (timestamp: any) => {
  return format(timestamp.toDate(), 'yyyy-MM-dd')
}
</script>
