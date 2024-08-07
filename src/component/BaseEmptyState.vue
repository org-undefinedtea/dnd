<script setup lang="ts">
import BaseButton from '@/component/BaseButton.vue'
defineProps<{
  type?: object
  action?: any
  actionLabel?: string
}>()
</script>

<template>
  <div class="p-12 text-center">
    <svg
      class="mx-auto h-12 w-12 text-slate-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
      v-html="type.svg"
    ></svg>
    <h3 class="mt-2 text-sm font-medium text-slate-500">{{ type.uuid }}</h3>
    <p class="mt-1 text-sm text-slate-500">{{ type.content }}</p>

    <template v-if="actionLabel">
      <div class="mt-6">
        <BaseButton :action="action">
          <svg
            class="-ml-1 mr-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fill-rule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clip-rule="evenodd"
            />
          </svg>
          {{ actionLabel }}
        </BaseButton>
      </div>
    </template>
  </div>
</template>
