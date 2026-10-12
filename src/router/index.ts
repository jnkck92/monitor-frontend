import { createRouter, createWebHistory } from 'vue-router'
import StandbySmallView from '../views/StandbySmallView.vue'
import StandbyLargeView from '../views/StandbyLargeView.vue'
import InfoMonitorView from '../views/InfoMonitorView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/d/:slug/standby',
      name: 'standby-small',
      component: StandbySmallView,
    },
        {
      path: '/d/:slug/standby-large',
      name: 'standby-large',
      component: StandbyLargeView,
    },
    {
      path: '/d/:slug/info',
      name: 'info',
      component: InfoMonitorView,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
})

export default router
