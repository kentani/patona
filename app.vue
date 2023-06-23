<template>
  <NuxtLayout>
    <ClientOnly fallback-tag="span" fallback="Loading...">
      <NuxtPage />
    </ClientOnly>
  </NuxtLayout>
</template>
