import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import ProductDetails from '../views/ProductDetails.vue'
import Cart from '../views/Cart.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter(to, from, next) {
      localStorage.access_token ? next('/') : next()
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter(to, from, next) {
      localStorage.access_token ? next('/') : next()
    }
  },
  {
    path: '/product/:id',
    name: 'ProductDetails',
    component: ProductDetails,
    beforeEnter(to, from, next) {
      !localStorage.access_token ? next('/login') : next()
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    beforeEnter(to, from, next) {
      !localStorage.access_token ? next('/login') : next()
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
