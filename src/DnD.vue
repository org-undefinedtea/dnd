<script setup lang="ts">
import api from '@/lib/api'
import { useDnDStore } from '@/module/DnD/store'

import { RouterView } from 'vue-router'

const { data } = api.auth.onAuthStateChange((event, session) => {
  const store = useDnDStore()
  store.session = session
})
// data.subscription.unsubscribe()
</script>

<template>
  <RouterView />
</template>
