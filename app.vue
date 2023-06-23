<template>
  <NuxtLayout>
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>

<script setup lang="ts">
import useAuth from "@/composables/auth/auth";
import AuthKey from "@/composables/auth/auth-key"

provide(AuthKey, useAuth())
</script>

<style>
body::-webkit-scrollbar {
  display: none;
}
</style>
