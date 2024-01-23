<template>
<v-row>
  <v-col
    v-if="$vuetify.display.xs"
    cols="12"
  >
    <members-d-member-physical-data-date-selector />
  </v-col>

  <v-col
    cols="12"
    sm="8"
    md="8"
    lg="8"
  >
    <members-d-member-physical-data-card-list />
  </v-col>

  <v-col
    v-if="!$vuetify.display.xs"
    cols="12"
    sm="4"
    md="4"
    lg="4"
  >
    <members-d-member-physical-data-date-selector />
  </v-col>
</v-row>
</template>

<script setup lang="ts">
import { GymType } from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import { MemberType } from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"
import { PhysicalDataType } from "@/composables/physical-data/physical-data"
import PhysicalDataKey from "@/composables/physical-data/physical-data-key"
import { DateSelectorType } from "@/composables/physical-data/date-selector/date-selector"
import DateSelectorKey from "@/composables/physical-data/date-selector/date-selector-key"

const { gym, onLoadedGym } = inject(GymKey) as GymType
const { member, onLoadedMember } = inject(MemberKey) as MemberType
const { physicalNumValues, physicalDataLoaded, wherePhysicalNumValue } = inject(PhysicalDataKey) as PhysicalDataType
const { setCurrentDate, setBeforeDate, setAfterDate } = inject(DateSelectorKey) as DateSelectorType

const formattedDate = (dateKey: string) => {
  if(!dateKey) return ''

  return `${dateKey.slice(0, 4)}-${dateKey.slice(4, 6)}-${dateKey.slice(6, 8)}`
}

onMounted(async () => {
  await onLoadedGym().then(async () => {
    onLoadedMember().then(async () => {
      physicalDataLoaded.value = false

      await wherePhysicalNumValue({ gymId: gym.value?.id, memberId: member.value?.id  })

      const valLength = physicalNumValues.value.length
      setCurrentDate({
        title: formattedDate(physicalNumValues.value[valLength - 1]?.dateKey),
        value: physicalNumValues.value[valLength - 1]?.dateKey,
      })
      setBeforeDate({
        title: formattedDate(physicalNumValues.value[valLength - 2]?.dateKey),
        value: physicalNumValues.value[valLength - 2]?.dateKey,
      })
      setAfterDate({
        title: formattedDate(physicalNumValues.value[valLength - 1]?.dateKey),
        value: physicalNumValues.value[valLength - 1]?.dateKey,
      })

      physicalDataLoaded.value = true
    })
  })
})
</script>
