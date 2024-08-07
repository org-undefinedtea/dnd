import { createRouter, createWebHistory } from 'vue-router'
import api from '@/lib/api'
import { useDnDStore } from '@/module/DnD/store'

import BaseLayout from '@/layout/BaseLayout.vue'

import BaseView from '@/view/BaseView.vue'
import HelpView from '@/view/HelpView.vue'
import AuthenticateView from '@/view/AuthenticateView.vue'

import NotFound from '@/view/NotFound.vue'

import DnDRoute from '@/module/DnD/route'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'public',
      component: BaseLayout,
      children: [
        { path: '', name: 'base', component: BaseView },
        { path: 'help', name: 'help', component: HelpView },
        { path: 'authenticate', name: 'authenticate', component: AuthenticateView },
      ],
    },
    ...DnDRoute,
    { path: '/4oh4', name: '4oh4', component: NotFound },
    { path: '/:pathMatch(.*)', redirect: '4oh4' },
  ],
})

router.beforeEach(async (to, from) => {
  const store = useDnDStore()

  try {
    const { data, error } = await api.auth.getSession()
    if (error) throw error
    store.session = data.session
  } catch (error) {
    console.log(`error: `, error)
  }

  if (to.meta.authentication && !store.session) {
    return { path: '/authenticate' }
  }
})

export default router
