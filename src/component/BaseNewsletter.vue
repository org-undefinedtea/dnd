<script setup lang="ts">
defineProps<{
  variant?: string
}>()

import { ref } from 'vue'
import api from '@/lib/api'
import BaseButton from '@/component/BaseButton.vue'

import { useForm } from '@tanstack/vue-form'
const form = useForm({
  defaultValues: {
    email: '',
  },
  onSubmit: async ({ value }) => {
    await newsletter(value)
  },
})

let load = ref(false)
const newsletter = async ({ email }) => {
  try {
    load.value = true
    const { error } = await api.from('newsletter').upsert({
      email,
    })
    if (error) throw error
  } catch (error) {
    console.log(`error: `, error)
  } finally {
    load.value = false
  }
}
</script>

<template>
  <div class="mx-auto max-w-7xl px-8" :class="variant">
    <div class="relative isolate overflow-hidden">
      <h1 class="mx-auto text-center text-3xl tracking-tight text-slate-100">
        Get notified when we are launching.
      </h1>
      <p class="mx-auto mt-2 max-w-xl text-center text-lg leading-5 text-slate-100">
        Reprehenderit ad esse et non officia in nulla. Id proident tempor incididunt nostrud nulla
        et culpa.
      </p>
      <form
        @submit.prevent="
          (e) => {
            form.handleSubmit()
          }
        "
        class="mx-auto mt-10 flex max-w-md gap-x-3"
      >
        <form.Field name="email">
          <template v-slot="{ field }">
            <label :for="field.name" class="sr-only">Email</label>
            <input
              :id="field.name"
              :name="field.name"
              :value="field.state.value"
              @blur="field.handleBlur"
              @input="(e) => field.handleChange(e.target.value)"
              type="email"
              autocomplete="email"
              required
              class="flex-auto rounded border-0 bg-slate-100/5 px-3.5 py-2 text-slate-100 shadow-sm ring-1 ring-inset ring-slate-100/10 placeholder:text-slate-300 focus:ring focus:ring-inset focus:ring-slate-100"
              placeholder="Enter your email"
            />
          </template>
        </form.Field>
        <BaseButton btn is="submit"> Let me know </BaseButton>
      </form>
    </div>
  </div>
</template>
