<template>
  <v-card
    variant="flat"
    rounded="lg"
  >
    <v-card-title class="px-0 pt-3 pb-0 text-brown1">
      <v-row
        dense
        justify="center"
        align="center"
      >
        <v-col
          cols="2"
          class="d-flex justify-center"
          align-self="center"
        >
          <v-btn
            id="prev-month-btn"
            class="px-0"
            style="min-width: 0px;"
            variant="text"
            :ripple="false"
            size="large"
            color="green1"
            rounded="lg"
            @click=""
          >
            <v-icon
              size="x-large"
            >
              mdi-chevron-left
            </v-icon>
          </v-btn>
        </v-col>

        <v-col
          cols="6"
          class="d-flex justify-center"
          align-self="center"
        >
          <div
            class="text-body-1 font-weight-bold"
          >
            YYYY年 M月
          </div>
        </v-col>

        <v-col
          cols="2"
          class="d-flex justify-center"
          align-self="center"
        >
          <v-btn
            id="next-month-btn"
            class="px-0"
            style="min-width: 0px;"
            variant="text"
            :ripple="false"
            size="large"
            color="green1"
            rounded="lg"
            @click=""
          >
            <v-icon
              size="x-large"
            >
              mdi-chevron-right
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text
      class="pa-2 pt-0"
    >
      <div
        class="d-flex py-2"
      >
        <div
          v-for="(day, index) in week"
          :key="day"
          class="text-center text-caption"
          style="width: 14.2%;"
        >
          {{ day }}
        </div>
      </div>

      <div
        v-for="(week, index) in dateList"
        :key="`week-${index}`"
        class="d-flex py-2"
      >
        <v-btn
          v-for="date in week"
          :key="date"
          class="text-center"
          style="width: 14.2%; min-width: 0px;"
          variant="text"
          size="small"
          elevation="0"
          rounded="lg"
          :ripple="false"
          @click=""
        >
          <span
            class="text-body-2"
          >
            {{ date }}
          </span>
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
const week = ref(['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'])
const dateList = ref([
  [1,2,3,4,5,6,7],
  [1,2,3,4,5,6,7],
  [1,2,3,4,5,6,7],
  [1,2,3,4,5,6,7],
])
</script>
