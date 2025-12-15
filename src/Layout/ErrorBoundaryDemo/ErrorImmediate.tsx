/**
 * ErrorImmediate - Immediate error page for error recovery demo
 *
 * path: 'error-immediate' → ErrorImmediatePage component, ErrorImmediateRoute
 */

import type { ReactNode } from 'react'
import { defineRoute } from 'stateurl'

const errorImmediateConfig = {
    path: 'immediate',
    trail: '/error-boundary-demo',
    label: 'errorImmediate',
} as const

export const ErrorImmediateRoute = defineRoute(ErrorImmediatePage, errorImmediateConfig)

export default function ErrorImmediatePage(): ReactNode {
    throw new Error('Immediate render error! Router will rollback to last stable location.')
}
