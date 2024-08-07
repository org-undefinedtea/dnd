<script setup lang="ts">
import BaseButton from '@/component/BaseButton.vue'
</script>

<template>
  <main class="my-52 grid min-h-full place-items-center px-8">
    <section class="text-center">
      <p class="text-base font-medium text-slate-100">4oh4</p>
      <h1 class="mt-4 text-5xl font-black tracking-tight text-slate-100">Resource not found</h1>
      <p class="mt-6 text-base leading-7 text-slate-300">
        Sorry, we could not find the resource you are looking for :/
      </p>
      <section class="mt-10 flex items-center justify-center gap-x-6">
        <BaseButton to="/"> Take me home </BaseButton>
        <a
          href="mailto:support@dnd.fake?subject=help me please"
          class="text-sm font-thin leading-5 text-slate-100"
          >Contact a human <span aria-hidden="true">&rarr;</span></a
        >
      </section>
    </section>
  </main>
</template>
