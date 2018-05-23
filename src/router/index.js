import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: '欢迎',
      component: () => import('@/views/welcome'), // ()=> 动态导入
    },
    {
      path: '/',
      name: '首页',
      redirect:'/index',
      component: () => import('@/views/index'),
      children: [
        {
          path: 'userList',
          name: '用户列表',
          component: () => import('@/views/userList')
        },
        {
          path: 'addUser',
          name: '添加用户',
          component: () => import('@/views/addUser')
        },
        {
          path: 'pictable',
          name: '工作台',
          component: () => import('@/views/pictable')
        },
        {
          path: 'button',
          name: '按钮组件',
          component: () => import('@/views/button')
        },
        {
          path: 'form',
          name: '表单合集',
          component: () => import('@/views/form')
        },
        {
          path: 'help',
          name: '帮助中心',
          component: () => import('@/views/help')
        },
        {
          path: 'switch',
          name: '切换组件',
          component: () => import('@/views/switch')
        },
        {
          path: 'slider',
          name: '滑块组件',
          component: () => import('@/views/slider')
        },
        {
          path: 'picker',
          name: '选择器组件',
          component: () => import('@/views/picker')
        },
        {
          path: 'upload',
          name: '上传组件',
          component: () => import('@/views/upload')
        },
        {
          path: 'rate',
          name: '评分组件',
          component: () => import('@/views/rate')
        },
        {
          path: 'transfer',
          name: '穿梭组件',
          component: () => import('@/views/transfer')
        },
        {
          path: 'table',
          name: '表格组件',
          component: () => import('@/views/table')
        },
        {
          path: 'tag',
          name: 'tag组件',
          component: () => import('@/views/tag')
        },
        {
          path: 'progress',
          name: 'progress组件',
          component: () => import('@/views/progress')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login')
    },
    {
      path: '*',
      name: 'not Found',
      component: () => import('@/views/notfound') // 404 页面
    },
  ]
})
