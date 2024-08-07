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

let account = ref(false)
const setAccount = () => {
  account.value = !account.value
}

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
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-slate-300 bg-white px-8 shadow-sm"
  >
    <div class="flex flex-1 gap-x-6 self-stretch">
      <form class="relative flex flex-1">
        <label for="search-field" class="sr-only">Search</label>
        <svg
          class="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-slate-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
            clip-rule="evenodd"
          />
        </svg>
        <input
          id="search-field"
          class="flex h-full w-full border-0 py-0 pl-8 pr-0 text-sm text-slate-900 placeholder:text-slate-500 focus:ring-0"
          placeholder="Search..."
          type="search"
          name="search"
        />
      </form>
      <div class="flex items-center gap-x-6">
        <button type="button" class="-m-2.5 p-2.5 text-slate-500 hover:text-slate-700">
          <span class="sr-only">Notification</span>
          <svg
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
            />
          </svg>
        </button>

        <div class="block h-6 w-px bg-slate-900/10" aria-hidden="true"></div>

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
              <span class="ml-4 text-sm leading-5 text-slate-900" aria-hidden="true">{{
                handle
              }}</span>
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
      </div>
    </div>
  </div>
</template>
