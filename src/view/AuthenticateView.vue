<script setup lang="ts">
import { ref } from 'vue'
import api from '@/lib/api'
import BaseButton from '@/component/BaseButton.vue'

import { useRouter } from 'vue-router'
const router = useRouter()

import { useForm } from '@tanstack/vue-form'
const form = useForm({
  defaultValues: {
    email: '',
    password: '',
  },
  onSubmit: async ({ value }) => {
    await authenticate(value)
  },
})

const load = ref(false)
const authenticate = async ({ email, password }) => {
  try {
    load.value = true
    const { error } = await api.auth.signInWithPassword({
      email,
      password,
    })
    if (error) throw error
    router.push('/dnd')
  } catch (error) {
    console.log(`error: `, error)
  } finally {
    load.value = false
  }
}
</script>

<template>
  <section class="my-52 flex min-h-full items-center justify-center px-8">
    <section class="w-full max-w-sm space-y-10">
      <div>
        <h1 class="text-center text-3xl tracking-tight text-slate-100">Authenticate</h1>
      </div>
      <form
        @submit.prevent="
          (e) => {
            form.handleSubmit()
          }
        "
        class="space-y-5"
      >
        <div class="relative -space-y-px rounded shadow">
          <div
            class="pointer-events-none absolute inset-0 z-10 rounded ring-1 ring-inset ring-slate-100/10"
          ></div>
          <div>
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
                  class="focus:ring-3 relative flex w-full rounded-t border-0 bg-slate-100/5 py-1.5 text-sm leading-7 text-slate-100 ring-1 ring-inset ring-slate-100/10 placeholder:text-slate-300 focus:z-10 focus:ring-inset focus:ring-slate-100"
                  placeholder="Enter your email"
                />
              </template>
            </form.Field>
          </div>
          <div>
            <form.Field name="password">
              <template v-slot="{ field }">
                <label :for="field.name" class="sr-only">Password</label>
                <input
                  :id="field.name"
                  :name="field.name"
                  :value="field.state.value"
                  @blur="field.handleBlur"
                  @input="(e) => field.handleChange(e.target.value)"
                  type="password"
                  autocomplete="current-password"
                  required
                  class="focus:ring-3 relative flex w-full rounded-b border-0 bg-slate-100/5 py-1.5 text-sm leading-7 text-slate-100 ring-1 ring-inset ring-slate-100/10 placeholder:text-slate-300 focus:z-10 focus:ring-inset focus:ring-slate-100"
                  placeholder="Enter your password"
                />
              </template>
            </form.Field>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
            />
            <label for="remember-me" class="ml-3 block text-sm leading-5 text-slate-100"
              >Remember me</label
            >
          </div>

          <div class="text-sm leading-6">
            <a href="#" class="text-slate-300 hover:text-slate-500">Forgot password?</a>
          </div>
        </div>
        <div>
          <BaseButton btn is="submit" variant="flex w-full justify-center">
            Authenticate
          </BaseButton>
        </div>
      </form>
    </section>
  </section>
</template>
