import { defineRoutes } from 'stateurl'
import Layout from './Layout'
import { HomeRoute } from './Layout/Home'
import { AboutRoute } from './Layout/About'
import { CounterRoute } from './Layout/Counter'
import { ProductsRoute } from './Layout/Products'
import { UsersRoute } from './Layout/Users'
import { SettingsRoute } from './Layout/Settings'
import { LabelExampleRoute } from './Layout/LabelExample'
import { LoaderDemoRoute } from './Layout/LoaderDemo'
import { QueryDemoRoute } from './Layout/QueryDemo'
import { ParamDemoRoute } from './Layout/ParamDemo'
import { GuardsRoute } from './Layout/GuardsDemo'
import { TransitionsDemoRoute } from './Layout/TransitionsDemo'
import { ErrorBoundaryDemoRoute } from './Layout/ErrorBoundaryDemo'
import { NestedLayoutDemoRoute } from './Layout/NestedLayoutDemo'
import { AtDemoRoute } from './Layout/AtDemo'
import { TypeSafetyDemoRoute } from './Layout/TypeSafetyDemo'
import { ForkDemoRoute } from './Layout/ForkDemo'
import { ForkLayoutRoute } from './Layout/ForkLayout'
import { TabsDemoRoute } from './Layout/TabsDemo'
import { ScrollSpyDemoRoute } from './Layout/ScrollSpyDemo'

export const routes = defineRoutes([
    {
        layoutPrefix: '',
        render: Layout,
        outlet: [
            HomeRoute,
            CounterRoute,
            ProductsRoute,
            UsersRoute,
            SettingsRoute,
            LabelExampleRoute,
            AtDemoRoute,
            TypeSafetyDemoRoute,
            LoaderDemoRoute,
            QueryDemoRoute,
            ParamDemoRoute,
            AboutRoute,
            NestedLayoutDemoRoute,
            GuardsRoute,
            TransitionsDemoRoute,
            ErrorBoundaryDemoRoute,
            ForkDemoRoute,
            ForkLayoutRoute,
            TabsDemoRoute,
            ScrollSpyDemoRoute,
        ],
    },
] as const)
