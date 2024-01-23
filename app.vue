<template>
  <NuxtLayout>
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import useAuth from "@/composables/auth/auth"
import AuthKey from "@/composables/auth/auth-key"
import useGym from "@/composables/gym/gym"
import GymKey from "@/composables/gym/gym-key"
import useInstructor from "@/composables/instructor/instructor"
import InstructorKey from "@/composables/instructor/instructor-key"
import useMember from "@/composables/member/member"
import MemberKey from "@/composables/member/member-key"
import useTrainingCategory from "@/composables/training-category/training-category"
import TrainingCategoryKey from "@/composables/training-category/training-category-key"
import useTrainingMenu from "@/composables/training-menu/training-menu"
import TrainingMenuKey from "@/composables/training-menu/training-menu-key"
import useTraining from "@/composables/training/training"
import TrainingKey from "@/composables/training/training-key"
import useCalender from "@/composables/training/calender/calender"
import CalenderKey from "@/composables/training/calender/calender-key"
import usePhysicalData from "@/composables/physical-data/physical-data"
import PhysicalDataKey from "@/composables/physical-data/physical-data-key"
import useDateSelector from "@/composables/physical-data/date-selector/date-selector"
import DateSelectorKey from "@/composables/physical-data/date-selector/date-selector-key"
import useScreenController from "@/composables/screen-controller/screen-controller"
import ScreenControllerKey from "@/composables/screen-controller/screen-controller-key"

provide(AuthKey, useAuth())
provide(GymKey, useGym())
provide(InstructorKey, useInstructor())
provide(MemberKey, useMember())
provide(TrainingCategoryKey, useTrainingCategory())
provide(TrainingMenuKey, useTrainingMenu())
provide(TrainingKey, useTraining())
provide(CalenderKey, useCalender())
provide(PhysicalDataKey, usePhysicalData())
provide(DateSelectorKey, useDateSelector())
provide(ScreenControllerKey, useScreenController())
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}

html {
  color: #4e4e4e
}
</style>
