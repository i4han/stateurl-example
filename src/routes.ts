import { defineRoutes } from 'stateurl'
import Layout from './components/Layout'
import Home from './components/Home'
import About from './components/About'
import Counter, { counterSchema } from './components/Counter'
import Products, { productsSchema } from './components/Products'
import ProductDetail, { productDetailSchema } from './components/ProductDetail'
import Users, { usersSchema } from './components/Users'
import UserDetail, { userDetailSchema } from './components/UserDetail'
import UserSettings, { userSettingsSchema } from './components/UserSettings'
import Settings from './components/Settings'
import LabelExample from './components/LabelExample'
import LoaderExample, { LoaderUserPage, loaderUserSchema } from './components/LoaderExample'
import QueryDemo from './components/QueryDemo'
import ParamDemo, { paramDemoSchema } from './components/ParamDemo'
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
import AtDemo from './components/AtDemo'
import TypeSafetyDemo from './components/TypeSafetyDemo'
import ForkDemo, {
    ForkLayoutDemo,
    ForkPanelA,
    ForkPanelB,
} from './components/ForkDemo'

export const routes = defineRoutes([
    {
        layoutPrefix: '',
        render: Layout,
        outlet: [
            { path: 'home', index: true, render: Home, label: 'home' },
            {
                path: 'counter',
                render: Counter,
                label: 'counter',
                ...counterSchema,
            },
            {
                path: 'products',
                render: Products,
                label: 'products',
                ...productsSchema,
                outlet: [
                    {
                        path: 'item/:productId',
                        render: ProductDetail,
                        label: 'productDetail',
                        ...productDetailSchema,
                    },
                ],
            },
            {
                path: 'users',
                render: Users,
                label: 'users',
                ...usersSchema,
                outlet: [
                    {
                        path: 'profile/:userId',
                        render: UserDetail,
                        label: 'userProfile',
                        ...userDetailSchema,
                    },
                    {
                        path: 'settings',
                        render: UserSettings,
                        label: 'userSettings',
                        ...userSettingsSchema,
                    },
                ],
            },
            { path: 'settings', render: Settings, label: 'settings' },
            { path: 'label-demo', render: LabelExample, label: 'labelDemo' },
            { path: 'at-demo', render: AtDemo, label: 'atDemo' },
            {
                path: 'type-safety',
                render: TypeSafetyDemo,
                label: 'typeSafety',
            },
            {
                path: 'loader-demo',
                render: LoaderExample,
                label: 'loaderDemo',
                outlet: [
                    {
                        path: 'user/:userId',
                        render: LoaderUserPage,
                        label: 'loaderUser',
                        ...loaderUserSchema,
                        loader: async ({ param }) => {
                            await new Promise((r) => setTimeout(r, 500))
                            return {
                                user: {
                                    id: param.userId,
                                    name: `User ${param.userId}`,
                                    email: `user${param.userId}@example.com`,
                                },
                            }
                        },
                    },
                ],
            },
            { path: 'query-demo', render: QueryDemo },
            {
                path: 'param-demo/:userId',
                render: ParamDemo,
                label: 'paramDemo',
                ...paramDemoSchema,
            },
            { path: 'about', render: About, label: 'about' },
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
            { path: 'fork-demo', render: ForkDemo, label: 'forkDemo' },
            {
                path: 'fork-layout',
                render: ForkLayoutDemo,
                label: 'forkLayout',
                fork: true,
                outlet: [
                    {
                        path: 'panel-a',
                        render: ForkPanelA,
                        label: 'forkPanelA',
                    },
                    {
                        path: 'panel-b',
                        render: ForkPanelB,
                        label: 'forkPanelB',
                    },
                ],
            },
        ],
    },
] as const)
