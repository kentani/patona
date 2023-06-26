<template>
  <v-container class="pt-0">
    <v-row>
      <v-col cols="6">
        <v-btn @click="onClickAddGym">
          ジムを追加
        </v-btn>
      </v-col>

      <v-dialog
        v-model="dialog"
      >
        <v-card
          variant="flat"
        >
          <v-card-text>
            <v-text-field
              v-model="name"
              label="ジム名"
            ></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-btn
              variant="text"
              @click="onClickCancelAddGym"
            >
              閉じる
            </v-btn>

            <v-btn
              variant="text"
              @click="onClickCompleteAddGym"
            >
              完了
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row
      justify="start"
      align="center"
    >
      <v-col
        v-for="gym in gyms"
        :key="gym.id"
        cols="12"
        sm="4"
        lg="3"
      >
        <v-card
          rounded="lg"
          :ripple="false"
          @click="onClickGym(gym)"
        >

          <v-card-title>
            <div>
              {{ gym.name }}
            </div>
          </v-card-title>

          <v-card-text class="text-body-1 text-left">
            <v-list-group>
              <v-list-item>

              </v-list-item>
            </v-list-group>
            <div>userId: {{ gym.userId }}</div>
          </v-card-text>
        </v-card>
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
const { gyms, gym, whereGym, createGym } = inject(GymKey) as GymType
const { instructors, whereInstructor, createInstructor } = inject(InstructorKey) as InstructorType
const { show } = inject(ScreenControllerKey) as ScreenControllerType

const router = useRouter()

const dialog = ref(false)
const name = ref('')

const onClickAddGym = () => {
  dialog.value = true
}

const onClickCompleteAddGym = async () => {
  await createGym({ userId: appUser.value?.id, name: name.value })
  await createInstructor({ userId: appUser.value?.id, gymId: gym.value?.id, owner: true, name: appUser.value?.name })
  await whereInstructor({ userId: appUser.value?.id })
  await whereGym({ ids: instructors.value.map(i => i.gymId) })
  dialog.value = false
}

const onClickCancelAddGym = async () => {
  name.value = ''
  dialog.value = false
}

const onClickGym = (gym: any) => {
  router.push({ path: '/i/menus', query: { gymId: gym.id } })
}

onMounted(async () => {
  await onLoadedAppUser().then(async () => {
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
