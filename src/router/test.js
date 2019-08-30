
import LoggedOverview from '@/components/Framework/Client/Logged-Main'

const test = [
  {
    path: '/test1',
    name: 'test1',
    component: () => import('@/components/user/data-base/index.vue')
  },
  {
    path: '/test2',
    name: 'test2',
    component: () => import('@/components/ElementDemo.vue')
  },
  {
    path: '/test3',
    name: 'test3',
    component: () => import('@/components/testDemo.vue')
  }, {
    path: '/home',
    name: 'homePage',
    component: LoggedOverview,
    children: [{
      path: 'test3',
      name: 'test3',
      component: () => import('@/components/User/notices/index.vue')
    }]
  }
]

export default test
