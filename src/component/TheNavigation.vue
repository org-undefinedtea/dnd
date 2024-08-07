<script setup lang="ts">
import icon from '@/asset/icon.svg'
</script>

<template>
  <section class="mx-auto px-8">
    <div class="flex h-16 justify-between">
      <RouterLink to="/" id="self" class="flex flex-shrink-0 items-center">
        <img class="h-12 w-auto" :src="icon" alt="DnD" />
      </RouterLink>
      <div class="flex flex-shrink-0 items-center">
        <RouterLink to="authenticate" class="text-sm font-thin leading-5 text-slate-100"
          >Authenticate <span aria-hidden="true">&rarr;</span></RouterLink
        >
      </div>
    </div>
  </section>
</template>
