<script setup lang="ts">
import HeadSearch from '@/module/DnD/component/HeadSearch.vue'
import HeadNotification from '@/module/DnD/component/HeadNotification.vue'
import HeadAccount from '@/module/DnD/component/HeadAccount.vue'
</script>

<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-slate-300 bg-white px-8 shadow-sm"
  >
    <div class="flex flex-1 gap-x-6 self-stretch">
      <HeadSearch />
      <div class="flex items-center gap-x-6">
        <HeadNotification />
        <div class="block h-6 w-px bg-slate-900/10" aria-hidden="true"></div>
        <HeadAccount />
      </div>
    </div>
  </div>
</template>
