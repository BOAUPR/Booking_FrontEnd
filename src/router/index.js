import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/manageroom',
    name: 'ManageRoom',
    component: () => import('../views/Rooms/RoomTable.vue')
  },
  {
    path: '/managebuilding',
    name: 'ManageBuilding',
    component: () => import('../views/ManageBuilding/BuildingTable.vue')
  },
  {
    path: '/booking',
    name: 'Booking',
    component: () => import('../views/Booking.vue')
  },
  {
    path: '/building',
    name: 'Building',
    component: () => import('../views/Building.vue')
  },
  {
    path: '/room',
    name: 'Room',
    component: () => import('../views/Room.vue')
  },
  {
    path: '/status',
    name: 'Status',
    component: () => import('../views/StatusBooking.vue')
  },
  {
    path: '/management',
    name: 'Management',
    component: () => import('../views/Management.vue')
  },
  {
    path: '/building/:buildingid/room',
    component: () => import('../views/Room.vue'),
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
