/**
 * Type-safe stateurl configuration
 *
 * SurlRouteProps with trail for typed breadcrumbs/ahead/to():
 *   export const userSchema = {
 *       trail: '/users/profile/:userId',
 *       schema: { param: { userId: 0 } }
 *   } as const
 *   function User({ param, breadcrumbs, ahead, to }: SurlRouteProps<typeof userSchema>) {
 *       // breadcrumbs: ['users', 'profile'] - static segments only
 *       // ahead: child paths from SurlTo (e.g., ['settings'] | ['posts', number])
 *       // to('../settings') - type-safe relative navigation
 *   }
 *
 * Module augmentation (SurlAt, SurlTo, SurlParam from routes):
 *   interface SurlAt extends SurlAtFrom<typeof routes> {}
 *   interface SurlTo extends SurlToFrom<typeof routes> {}
 *   interface SurlParam extends SurlParamFrom<typeof routes> {}
 */

import type { SurlAtFrom, SurlToFrom, SurlParamFrom, SurlFeatureFrom, SurlLabelFrom } from 'stateurl'
import type { routes } from './routes'
import type { appFeature } from './App'

declare module 'stateurl' {
    interface SurlAt extends SurlAtFrom<typeof routes> {}
    interface SurlTo extends SurlToFrom<typeof routes> {}
    interface SurlParam extends SurlParamFrom<typeof routes> {}
    interface SurlFeature extends SurlFeatureFrom<typeof appFeature> {}
    interface SurlLabel extends SurlLabelFrom<typeof routes> {}
}
