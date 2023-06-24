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

provide(AuthKey, useAuth())
provide(GymKey, useGym())
provide(InstructorKey, useInstructor())
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
