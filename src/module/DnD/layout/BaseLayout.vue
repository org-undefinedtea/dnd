<script setup lang="ts">
import { ref, onMounted } from 'vue'

import { useDnDStore } from '@/module/DnD/store'
const store = useDnDStore()

import TheNavigation from '@/module/DnD/component/TheNavigation.vue'
import TheHead from '@/module/DnD/component/TheHead.vue'
import BaseBreadcrumb from '@/component/BaseBreadcrumb.vue'

let canLoad = ref(false)
onMounted(() => {
  if (store.session) {
    canLoad.value = true
  }
})
</script>

<template>
  <section v-if="canLoad" class="h-screen bg-white">
    <TheNavigation />

    <section class="pl-20">
      <TheHead />
      <BaseBreadcrumb />
      <article class="flex">
        <RouterView />
      </article>
    </section>
  </section>
</template>
