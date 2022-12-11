import { createRouter, createWebHistory } from 'vue-router'
import FrontLayout from '../components/FrontLayout.vue'
import store from '../store'
const routes = [
  {
    path: '/',
    component: FrontLayout,
    children:[
      {
        path: '/',
        name: 'Index',
        component: () => import(/* webpackChunkName: "index" */ '../views/Index.vue')
      },
      {
        path: '/category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
      },
      {
        path: '/detail',
        name: 'Detail',
        component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
      },

    ]
  },
  {
    path: '/panel',
    meta: { requiresAuth: true },
    component:FrontLayout,
    children:[
        {
          path: '/panel',
          name: 'Panel',
          component: () => import(/* webpackChunkName: "panel" */ '../views/Panel/Panel')
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import(/* webpackChunkName: "profile" */ '../views/Panel/Profile/Profile.vue')
        },
        {
          path: '/profile/update',
          name: 'ProfileUpdate',
          component: () => import(/* webpackChunkName: "profile/update" */ '../views/Panel/Profile/Update.vue')
        },
        {
          path: '/collection',
          name: 'Collection',
          component: () => import(/* webpackChunkName: "collection" */ '../views/Panel/Collection/Collection.vue')
        },
        {
          path: 'collection/store',
          name: 'CollectionStore',
          component: () => import(/* webpackChunkName: "collection/store" */ '../views/Panel/Collection/Store.vue')
        },
        {
          path: 'nft/store',
          name: 'NftStore',
          component: () => import(/* webpackChunkName: "nft/store" */ '../views/Panel/Nft/Store.vue')
        },
      ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior (to, from, savedPosition) {
    return { top: 0 };
  }
})


router.beforeEach((to,from,next)=>{
  // if(to.name === undefined && to.fullPath !== '/'){
  //   next({name:'NotFound'});
  // }
  if(to.meta.requiresAuth === true){
    store.dispatch('checkToken')
  }
  if(to.meta.requiresAuth && !store.getters.getToken){
    next({name:'Index'});
  }
  else{
    next();
  }
});

export default router
