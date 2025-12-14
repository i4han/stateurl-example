/**
 * Type-safe stateurl configuration with autocomplete
 *
 * This file provides typed wrappers for routes and components.
 *
 * Usage:
 *   import { TypedProps } from './stateurl-types'
 *
 *   // Use component name as key for typed props
 *   function Counter({ query }: TypedProps<'Counter'>) {
 *       query.count  // typed as number | undefined
 *   }
 *
 *   function UserProfile({ param }: TypedProps<'UserProfile'>) {
 *       param.userId  // typed as number
 *   }
 */

import type React from 'react'
import type { RouteComponentProps } from 'stateurl'
import { toLabel as _toLabel } from 'stateurl'

// =============================================================================
// Component Schema Registry
// =============================================================================

/**
 * Component schemas - maps component names to their route schemas.
 * Single source of truth for param and query types.
 */
const componentSchemas = {
    // Components with query params
    Counter: { query: { count: 0 } },
    Products: { query: { sort: '', filter: '' } },

    // Components with path params
    ProductDetail: { param: { productId: 0 } },
    UserDetail: { param: { userId: 0 } },
    LoaderUserPage: { param: { userId: 0 } },
    ParamDemo: { param: { userId: 0 } },

    // Components without params (for completeness)
    Home: {},
    About: {},
    Settings: {},
    Users: {},
    Layout: {},
} as const

type ComponentSchemas = typeof componentSchemas

/** All registered component names */
export type ComponentNames = keyof ComponentSchemas

// =============================================================================
// Type Utilities
// =============================================================================

// Widen literal types to base types (0 → number, '' → string)
type Widen<T> = T extends number
    ? number
    : T extends string
      ? string
      : T extends boolean
        ? boolean
        : T

// Remove readonly and widen literal types
type MutableWiden<T> = { -readonly [K in keyof T]: Widen<T[K]> }

// Make all properties allow undefined (for query cleanup)
type WithUndefined<T> = { [K in keyof T]: T[K] | undefined }

// Dynamic query type (for untyped queries)
type DynamicQuery = Record<string, string | undefined>

// =============================================================================
// Extract Types from Schema
// =============================================================================

/** Extract param type from a schema */
type SchemaParams<S> = S extends { param: infer P }
    ? MutableWiden<P>
    : Record<string, never>

/** Extract query type from a schema */
type SchemaQueries<S> = S extends { query: infer Q }
    ? MutableWiden<Q>
    : undefined

// Typed query: schema queries (with undefined for cleanup) + dynamic fallback
type TypedSchemaQuery<S> = SchemaQueries<S> extends undefined
    ? DynamicQuery
    : WithUndefined<SchemaQueries<S>> & DynamicQuery

// =============================================================================
// Component Props
// =============================================================================

/**
 * Typed RouteComponentProps for a component by name
 *
 * @example
 * ```tsx
 * import { TypedProps } from './stateurl-types'
 *
 * function Counter({ query }: TypedProps<'Counter'>) {
 *     query.count  // typed as number | undefined
 * }
 *
 * function UserDetail({ param, to, breadcrumbs }: TypedProps<'UserDetail'>) {
 *     param.userId  // typed as number
 * }
 * ```
 */
export type TypedProps<C extends ComponentNames> = Omit<RouteComponentProps, 'param' | 'query'> & {
    param: SchemaParams<ComponentSchemas[C]>
    query: TypedSchemaQuery<ComponentSchemas[C]>
}

/**
 * Typed component function by name
 */
export type TypedComponent<C extends ComponentNames> = (props: TypedProps<C>) => React.ReactNode

// =============================================================================
// Route-based types (for direct route type usage)
// =============================================================================

/** Extract param type from a route's schema */
export type RouteParams<R> = R extends { schema: { param: infer P } }
    ? MutableWiden<P>
    : Record<string, never>

/** Extract query type from a route's schema */
export type RouteQueries<R> = R extends { schema: { query: infer Q } }
    ? MutableWiden<Q>
    : undefined

/** Extract label from a route */
export type RouteLabel<R> = R extends { label: infer L } ? L : undefined

/** Extract path from a route */
export type RoutePath<R> = R extends { path: infer P } ? P : undefined

// Typed query from route
type TypedRouteQuery<R> = RouteQueries<R> extends undefined
    ? DynamicQuery
    : WithUndefined<RouteQueries<R>> & DynamicQuery

/**
 * Typed RouteComponentProps inferred from Route type directly
 */
export type RouteProps<R> = Omit<RouteComponentProps, 'param' | 'query'> & {
    param: RouteParams<R>
    query: TypedRouteQuery<R>
}

// =============================================================================
// Label-based Types (for navigation)
// =============================================================================

/**
 * Route schema - single source of truth for labels and their params.
 * Used for toLabel() navigation with autocomplete.
 */
export const routeSchema = {
    home: {},
    counter: { query: { count: 0 } },
    products: { query: { sort: '', filter: '' } },
    productDetail: { param: { productId: 0 } },
    users: {},
    userProfile: { param: { userId: 0 } },
    settings: {},
    labelDemo: {},
    loaderDemo: {},
    loaderUser: { param: { userId: 0 } },
    about: {},
    forkDemo: {},
    forkLayout: {},
    forkPanelA: {},
    forkPanelB: {},
} as const

/** Full readonly route schema type */
export type RouteSchema = typeof routeSchema

/** All known labels */
export type AppLabels = keyof RouteSchema

/** Get full schema for a label */
export type SchemaFor<L extends AppLabels> = RouteSchema[L]

// Infer param types from label schema
type LabelParams = {
    [L in keyof RouteSchema]: RouteSchema[L] extends { param: infer P }
        ? MutableWiden<P>
        : undefined
}

/** Get params for a label */
export type ParamsFor<L extends AppLabels> = LabelParams[L]

// Type-safe toLabel with autocomplete
export function toLabel<L extends AppLabels>(
    label: L,
    ...args: LabelParams[L] extends undefined
        ? []
        : [params: LabelParams[L]]
): string {
    return _toLabel(label, args[0] as any)
}

// Re-export for convenience
export { go, handleHref } from 'stateurl'
