import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NavDetail from '../views/Detail/NavDetail'
import DictDetail from '../views/Detail/DictDetail'
import FileDetail from '../views/Detail/FileDetail'
import Linkage from '../views/Linkage'
import LinkageNew from '../views/Linkage/New'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/NavDetail',
    name: 'NavDetail',
    component: NavDetail,
  },
  {
    path: '/DictDetail',
    name: 'DictDetail',
    component: DictDetail,
  },
  {
    path: '/FileDetail',
    name: 'FileDetail',
    component: FileDetail,
  },
  {
    path: '/Linkage',
    name: 'Linkage',
    component: Linkage,
  },
  {
    path: '/LinkageNew',
    name: 'LinkageNew',
    component: LinkageNew,
  },

  { path: '*', redirect: '/Home' },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
