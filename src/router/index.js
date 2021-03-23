import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home'
// import About from '../views/About'
// import User from '../views/User'
// import Profile from '../views/Profile'

//路由懒加载
const Home = () => import('../views/Home/Home')
const Category = () => import('../views/Category/Category')
const Cart = () => import('../views/Cart/Cart')
const Profile = () => import('../views/Profile/Profile')
const Detail = () => import('../views/Detail/Detail')

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    path: '/detail/:iid',
    component: Detail
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
