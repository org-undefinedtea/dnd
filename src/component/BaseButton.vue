<script setup lang="ts">
defineProps<{
  btn?: boolean
  action?: Function
  to?: string | object

  variant?: string

  external?: boolean
  is?: string
}>()
</script>

<template>
  <template v-if="!btn && !action && !external">
    <RouterLink
      :to="to"
      class="flex-none rounded bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-slate-100"
      :class="variant"
    >
      <slot />
    </RouterLink>
  </template>

  <template v-if="external">
    <a
      :href="to"
      class="flex-none rounded bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-slate-100"
      :class="variant"
      target="_blank"
      rel="noreferrer"
    >
      <slot />
    </a>
  </template>

  <template v-if="btn">
    <button
      :type="is"
      class="flex-none rounded bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-slate-100"
      :class="variant"
    >
      <slot />
    </button>
  </template>

  <template v-if="action">
    <button
      @click.prevent="action"
      class="flex-none rounded bg-slate-100 px-3.5 py-2.5 text-sm font-medium text-slate-900 shadow-sm hover:bg-slate-100 focus-visible:outline focus-visible:outline-slate-100"
      :class="variant"
    >
      <slot />
    </button>
  </template>
</template>
