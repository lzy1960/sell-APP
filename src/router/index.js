import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods/goods'
import ratings from '../components/ratings/ratings'
import seller from '../components/seller/seller'
import pay from '../components/pay/pay'
import login from '../components/login/login'
import register from '../components/register/register'
import paysuccess from '../components/paysuccess/paysuccess'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [{
    path: '/',
    redirect: '/goods'
  }, {
    path: '/goods',
    name: 'goods',
    component: goods,
    children: [{
      path: 'pay',
      name: 'pay',
      component: pay,
      children: [{
        path: 'success',
        name: 'paysuccess',
        component: paysuccess
      }, {
        path: 'login',
        name: 'login',
        component: login
      }, {
        path: 'register',
        name: 'register',
        component: register
      }]
    }]
  }, {
    path: '/ratings',
    name: 'ratings',
    component: ratings
  }, {
    path: '/seller',
    name: 'seller',
    component: seller
  }]
})
