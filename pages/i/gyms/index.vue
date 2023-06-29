<template>
  <v-container>
    <common-breadcrumbs
      :breadcrumbs="breadcrumbs"
    />

    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="3"
      >
        <v-row>
          <v-col cols="12">
            <gyms-search />
          </v-col>

          <v-col cols="12">
            <gyms-add-gym />
          </v-col>
        </v-row>

      </v-col>

      <v-col
        cols="12"
        sm="8"
        md="9"
      >
        <gyms-gym-list />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { AuthType } from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { InstructorType } from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import { ScreenControllerType } from "@/composables/screen-controller/screen-controller"
import ScreenControllerKey from "@/composables/screen-controller/screen-controller-key"

const { appUser, onLoadedAppUser } = inject(AuthKey) as AuthType
const { whereGym, resetGym } = inject(GymKey) as GymType
const { instructors, whereInstructor } = inject(InstructorKey) as InstructorType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const breadcrumbs = ref([
  { id: '1', title: 'ジム一覧', to: '/i/gyms', disabled: true },
])

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
    resetGym()

    await whereInstructor({ userId: appUser.value?.id })

    if(appUser.value?.admin) {
      await whereGym({ all: true })
    } else if(instructors.value.length) {
      await whereGym({ ids: instructors.value.map(i => i.gymId) })
    }
  })

  show()
})
</script>
