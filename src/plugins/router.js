// plugins/router.js
import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Demo from '@/views/Demo.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/demo',
        name: 'Demo',
        component: Demo,
    }
]

const router = createRouter({
    history: createWebHashHistory('/facet/'),
    routes,
})

export default router 