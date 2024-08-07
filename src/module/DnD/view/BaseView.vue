<script setup lang="ts">
import { ref } from 'vue'

import TheMain from '@/module/DnD/component/TheMain.vue'

import BaseEmptyState from '@/component/BaseEmptyState.vue'
import BaseButton from '@/component/BaseButton.vue'

// import BaseLoad from '@/component/BaseLoad.vue'

const type = ref({
  uuid: 'no datasource',
  content: 'additional configuration required',
  svg: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />',
})

const action = async () => {
  console.log('vue')
}
</script>

<template>
  <TheMain>
    <!-- <div class="grid place-items-center p-6">
      <BaseLoad />
    </div> -->
    <BaseEmptyState :type="type" />
    <div class="flex flex-col gap-3">
      <BaseButton to="/dnd">RouteLink to /dnd</BaseButton>
      <BaseButton to="https://undefinedtea.xyz" external>External to undefinedtea.xyz</BaseButton>
      <BaseButton :action="action">ConsoleLog value 'vue'</BaseButton>
      <BaseButton btn is="submit">Form submit action</BaseButton>
    </div>
  </TheMain>
</template>
