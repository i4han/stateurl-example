import type { Route } from 'stateurl'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Counter from './components/Counter'
import Products from './components/Products'
import ProductDetail from './components/ProductDetail'
import Users from './components/Users'
import UserDetail from './components/UserDetail'
import Settings from './components/Settings'

export const routes = [
    {
        layout: true,
        render: Layout,
        outlet: [
            { path: 'home', index: true, render: Home },
            { path: 'counter', render: Counter },
            {
                path: 'products',
                render: Products,
                outlet: [
                    { path: 'item/:productId', render: ProductDetail },
                ],
            },
            {
                path: 'users',
                render: Users,
                outlet: [
                    { path: 'profile/:userId', render: UserDetail },
                ],
            },
            { path: 'settings', render: Settings },
            { path: 'about', render: About },
        ],
    },
] as const satisfies Route[]
