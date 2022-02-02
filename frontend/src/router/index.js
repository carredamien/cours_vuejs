import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Posts from '@/views/Posts.vue'
import Login from '@/views/Login.vue'
import Disconnected from '@/views/Disconnected.vue'
import Signup from '@/views/Signup.vue'
import UpdateUser from '@/components/main/UpdateUser.vue'
import PostId from '@/views/PostId.vue'
import CreatePost from '@/views/CreatePost.vue'
import Modal from '@/components/main/Modal.vue'
import NotFound from '@/views/NotFound.vue'
import UpdatePost from '@/components/main/UpdatePost.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title:'Accueil',
    }
  },
  {
    path: '/articles',
    name: 'Posts',
    component: Posts,
    meta: {
      title:'Les news',
    }
  },
  {
    path: '/article/:id',
    name: 'PostId',
    component: PostId,
    meta: {
      title:'article',
    },
    props: true
  },
  {
    path: '/article/modifier-mon-article/:id',
    name: 'UpdatePost',
    component: UpdatePost,
    meta: {
      title:'Modifier mon article',
    },
    props: true
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: Signup,
    meta: {
      title:'Inscription',
    }
  },
  {
    path: '/connexion',
    name: 'Login',
    component: Login,
    meta: {
      title:'Connexion',
    }
  },
  {
    path: '/au revoir',
    name: 'Disconnected',
    component: Disconnected,
    meta: {
      title:'Déconnexion',
    }
  },
  {
    path: '/réglages',
    name: 'Settings',
    component: UpdateUser,
    meta: {
      title:'Paramètres du compte',
    }
  },
  {
    path: '/articles/new-article',
    name: 'CreatePost',
    component: CreatePost,
    meta: {
      title:'Nouvel article',
    }
  },
  {
    path: '/modale',
    name: 'Modal',
    component: Modal,
    
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title:'404 - Page non trouvée!',
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to) =>{
  document.title = to.meta.title;
})

export default router
