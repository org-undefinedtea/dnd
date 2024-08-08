<script setup lang="ts">
import { ref, provide } from 'vue'
import api from '@/lib/api'
import { useEventHandle } from '@/lib/useGlobalEventHandle'
import { useMainStore } from '@/store'

const store_ = useMainStore()

import { useDnDStore } from '@/module/DnD/store'

import { RouterView } from 'vue-router'

const { data } = api.auth.onAuthStateChange((event, session) => {
  const store = useDnDStore()
  store.session = session
})
// data.subscription.unsubscribe()

const vClose = useEventHandle
const noClose = ref<HTMLElement | null>(null)
provide('noClose', noClose)
const handleClose = (event: Event, element: HTMLElement) => {
  store_.closePopoverAll()
}
</script>

<template>
  <section v-close:[noClose]="handleClose">
    <RouterView />
  </section>
</template>
