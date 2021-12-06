
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/Index.vue') }
  //   ]
  // },
  {
    path: '/',
    component: () => import('layouts/HomeLayout.vue'),
    children: [
      { path: '', component: () => import('pages/home.vue') },
      // { path: 'create', component: () => import('pages/create.vue') },
      // { path: 'browse', component: () => import('pages/browse.vue') },
      // { path: 'create/:newgroupname', component: () => import('pages/create.vue') },
      // { path: 'tests', component: () => import('pages/tests.vue') },
      // { path: 'pricing', component: () => import('pages/pricing.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
