<template>
  <v-card
    rounded="lg"
    variant="flat"
  >
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <common-underlined-text
            text="ジム名"
            class="text-h6 font-weight-bold"
          />

          <div class="mt-4 text-body-1">
            <span class="pr-2">
              {{ gym?.name }}
            </span>
          </div>
        </v-col>

        <v-col cols="12">
          <common-underlined-text
            text="招待リンク"
            class="text-h6 font-weight-bold"
          />

          <div class="mt-2 text-body-1">
            <span>
              {{ invitationURL }}
            </span>

            <v-btn
              variant="flat"
              size="small"
              icon
            >
              <v-icon
                icon="mdi-content-copy"
                @click="onClickCopy"
              ></v-icon>
            </v-btn>

            <v-snackbar
              v-model="snackbar"
              :timeout="1500"
            >
              招待リンクをコピーしました
            </v-snackbar>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"

const { gym, onLoadedGym } = inject(GymKey) as GymType

const invitationURL = ref('')
const snackbar = ref(false)

const onClickCopy = () => {
  navigator.clipboard.writeText(invitationURL.value).then(() => {
    snackbar.value = true
  })
}

onMounted(async () => {
  await onLoadedGym().then(async () => {
    invitationURL.value = `${window.location.origin}/invitation?gymId=${gym.value?.id}`
  })
})
</script>
