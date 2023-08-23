import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/Query',
    name: 'Query',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Query.vue'),
    // props: { name: '나는 라우터에서 전송', data: 'props는 헷갈려', num: 55555 } // ==> Query 형식 props 사용 가능(객체스타일)
    props: (route) => ({
      name: route.query.name,
      data: route.query.data,
      num: route.query.num
    })
  },
  {
    path: '/Params/:name/:data/:num',
    name: 'Params',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Params.vue'),
    props: true // ==> Params 형식 props 사용 가능
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
