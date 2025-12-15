/**
 * Type-safe stateurl configuration
 *
 * SurlRouteProps with trail for typed breadcrumbs/ahead:
 *   export const userSchema = {
 *       trail: '/users/profile/:userId',
 *       schema: { param: { userId: 0 } }
 *   } as const
 *   function User({ param, breadcrumbs, ahead }: SurlRouteProps<typeof userSchema>) {
 *       // breadcrumbs: ['users', `profile/${number}`]
 *       // ahead: child paths from SurlTo
 *   }
 *
 * Module augmentation (SurlAt, SurlTo, SurlParam from routes):
 *   interface SurlAt extends SurlAtFrom<typeof routes> {}
 *   interface SurlTo extends SurlToFrom<typeof routes> {}
 *   interface SurlParam extends SurlParamFrom<typeof routes> {}
 */

import type { SurlAtFrom, SurlToFrom, SurlParamFrom } from 'stateurl'
import type { routes } from './routes'

declare module 'stateurl' {
    interface SurlAt extends SurlAtFrom<typeof routes> {}
    interface SurlTo extends SurlToFrom<typeof routes> {}
    interface SurlParam extends SurlParamFrom<typeof routes> {}
}
