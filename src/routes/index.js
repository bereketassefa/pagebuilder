import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/HomePage.vue'
import EditPage from '../pages/EditPage.vue'
import PreviewPage from '../pages/PreviewPage.vue'
import NotFound from '../pages/NotFound.vue'
import NewTrial from '../components/NewTrial.vue'
import NewPage from '../pages/NewPage.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/edit',
  //   name: 'About',
  //   component: EditPage
  // },
  {
    path: '/edit/:id',
    name: 'EditPage',
    component: EditPage,
    props: true,
  },
  {
    path: '/preview/:id',
    name: 'preview',
    component: PreviewPage
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/trial',
    name: 'trial',
    component: NewTrial
  },
  {
    path: '/newpage',
    name: 'trial',
    component: NewPage
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router