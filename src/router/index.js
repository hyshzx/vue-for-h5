import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import index from '@/ui/index'
import me from '@/ui/me'
import service from '@/ui/service'
import login from '@/ui/login'
import good from '@/ui/good'
import good_office from '@/ui/good_office'
import good_pj from '@/ui/good_pj'
import address from '@/ui/address'
import address_edit from '@/ui/address_edit'
import collection from '@/ui/collection'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: function(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [{
    path: '/',
    name: 'index',
    component: index
  }, {
    path: '/me',
    name: 'me',
    component: me
  }, {
    path: '/service',
    name: 'service',
    component: service
  }, {
    path: '/login',
    name: 'login',
    component: login
  }, {
    path: '/good',
    name: 'good',
    component: good,
  }, {
    path: '/good_pj',
    name: 'good_pj',
    component: good_pj
  }, {
    path: '/good_office',
    name: 'good_office',
    component: good_office
  }, {
    path: '/address',
    name: 'address',
    component: address
  }, {
    path: '/address_edit',
    name: 'address_edit',
    component: address_edit
  }, {
    path: '/collection',
    name: 'collection',
    component: collection
  }],

})
