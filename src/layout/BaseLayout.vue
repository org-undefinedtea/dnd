<script setup lang="ts">
import TheNavigation from '@/component/TheNavigation.vue'

// import { useMainStore } from '@/store'
// const store = useMainStore()
</script>

<template>
  <section class="h-screen bg-slate-900">
    <TheNavigation />
    <main>
      <RouterView />
    </main>
  </section>
</template>
