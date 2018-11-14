import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Hoge from '@/components/Hoge'
import Todo from '@/components/Todo'
import Proto from '@/components/TodoProto'
import Api from '@/components/Api'
import usernameComponent from '@/components/Username'
import Gizumovie from '@/components/Gizumovie'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld
  },
  {
    path: '/hoge',
    name: 'Hoge',
    component: Hoge
  },
  {
    path: '/todo',
    name: 'Todo',
    component: Todo
  },
  {
    path: '/proto',
    name: 'Proto',
    component: Proto
  },
  {
    path: '/api',
    name: 'Api',
    component: Api
  },
  {
    path: '/gizumovie',
    name: 'Gizumovie',
    component: Gizumovie
  },
  {
    path: '/username',
    name: 'Username',
    component: usernameComponent
  }
  ]
})
