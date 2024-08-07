<script setup lang="ts">
import { ref, onMounted } from 'vue'
import api, { fetchAccountData, fetchAccountStorage } from '@/lib/api'

import { useRouter } from 'vue-router'
const router = useRouter()

const end = async () => {
  try {
    const { error } = await api.auth.signOut()
    if (error) throw error
    router.push('/authenticate')
  } catch (error) {
    console.log(`error: `, error)
  }
}

import { useDnDStore } from '@/module/DnD/store'
const store = useDnDStore()

const uuid = store.session.user.id

import { useKeyboardEventHandle } from '@/lib/useGlobalEventHandle'
let account = ref(false)
const setAccount = () => {
  account.value = !account.value
}
const handleEscape = () => {
  account.value = false
}
useKeyboardEventHandle({
  Escape: handleEscape,
  // 'ctrl:e': () => console.log('ctrl:e'),
})

let handle = ref('')
let firstname = ref('')
let surname = ref('')
let cookie_consent = ref('')
let path = ref('')

let load = ref(false)
const getAccount = async () => {
  try {
    load.value = true

    const { data, error } = await fetchAccountData(
      uuid,
      'handle, firstname, surname, email, cookie_consent, path',
    )
    if (error) throw error

    handle.value = data.handle
    firstname.value = data.firstname
    surname.value = data.surname
    cookie_consent.value = data.cookie_consent
    path.value = data.path
  } catch (error) {
    console.log(`error: `, error)
  } finally {
    load.value = false
  }
}

let src = ref('')
const getAccountStorage = async () => {
  try {
    const { data, error } = await fetchAccountStorage(path.value)
    if (error) throw error

    src.value = URL.createObjectURL(data)
  } catch (error) {
    console.log('error:', error)
  }
}

onMounted(async () => {
  await getAccount()
  await getAccountStorage()
})
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="-m-1.5 flex items-center p-1.5"
      aria-expanded="false"
      aria-haspopup="true"
      @click.prevent="setAccount()"
    >
      <span class="sr-only">Account Navigation</span>
      <img class="h-8 w-8 rounded-full bg-slate-50" :src="src" alt="profile image" />
      <span class="flex items-center">
        <span class="ml-4 text-sm leading-5 text-slate-900" aria-hidden="true">{{ handle }}</span>
        <svg
          class="ml-2 h-5 w-5 text-slate-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>

    <Transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="account"
        class="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-slate-900/5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <RouterLink
          to="/"
          class="flex px-3 py-1 text-sm leading-5 text-slate-900"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-0"
          >Account</RouterLink
        >
        <RouterLink
          to="authenticate"
          class="flex px-3 py-1 text-sm leading-5 text-slate-900"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-1"
          @click.prevent="end"
          >End Session</RouterLink
        >
      </div>
    </Transition>
  </div>
</template>
