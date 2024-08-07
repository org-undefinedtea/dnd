import BaseLayout from '@/module/DnD/layout/BaseLayout.vue'
import BaseView from '@/module/DnD/view/BaseView.vue'

export default [
  {
    path: '/dnd',
    name: 'internal',
    component: BaseLayout,
    meta: {
      authentication: true,
    },
    children: [{ path: '', name: 'dnd', component: BaseView }],
  },
]
