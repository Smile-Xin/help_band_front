import Vue from 'vue'
import VueRouter from 'vue-router'

const TaskList = () => import('@/components/TaskList.vue')
const TaskDetail = () => import('@/components/TaskDetail.vue')

Vue.use(VueRouter)

const routes = [
  {path: '/', component:TaskList , meta: { title: '欢迎来到HelpBank' }},
  {path: '/index', component:TaskList , meta: { title: '欢迎来到HelpBank' }},
  {path: '/task/detail/:taskId', component:TaskDetail , meta: { title: '任务详情' }, props: true},

]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})


// 设置页面标题
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title ? to.meta.title : '加载中'
  }
  next()
})

export default router
