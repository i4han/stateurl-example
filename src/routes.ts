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
import ViaExample from './components/ViaExample'
import QueryDemo from './components/QueryDemo'
import ParamDemo from './components/ParamDemo'
import { GuardsRoute } from './components/GuardsDemo'
import TransitionsDemo, {
    TransitionsFastPage,
    TransitionsMediumPage,
    TransitionsSlowPage,
} from './components/TransitionsDemo'
import ErrorBoundaryDemo, {
    ErrorStablePage,
    ErrorImmediatePage,
    ErrorDelayedPage,
} from './components/ErrorBoundaryDemo'
import NestedLayoutDemo from './components/NestedLayoutDemo'

export const routes = [
    {
        layoutPrefix: '',
        render: Layout,
        outlet: [
            { path: 'home', index: true, render: Home },
            { path: 'counter', render: Counter },
            {
                path: 'products',
                render: Products,
                outlet: [{ path: 'item/:productId', render: ProductDetail }],
            },
            {
                path: 'users',
                render: Users,
                outlet: [{ path: 'profile/:userId', render: UserDetail }],
            },
            { path: 'settings', render: Settings },
            { path: 'via-demo', render: ViaExample },
            { path: 'query-demo', render: QueryDemo },
            { path: 'param-demo/:userId', render: ParamDemo },
            { path: 'about', render: About },
            { path: 'nested-layout-demo', render: NestedLayoutDemo },
            GuardsRoute,
            { path: 'transitions-demo', render: TransitionsDemo },
            { path: 'transitions-fast', render: TransitionsFastPage },
            { path: 'transitions-medium', render: TransitionsMediumPage },
            { path: 'transitions-slow', render: TransitionsSlowPage },
            { path: 'error-boundary-demo', render: ErrorBoundaryDemo },
            { path: 'error-stable', render: ErrorStablePage },
            { path: 'error-immediate', render: ErrorImmediatePage },
            { path: 'error-delayed', render: ErrorDelayedPage },
        ],
    },
] as const satisfies Route[]
