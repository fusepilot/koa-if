import isFunction from 'lodash/lang/isFunction'
import isBoolean from 'lodash/lang/isBoolean'

export default function(middleware, condition=true) {
  return async (ctx, next) => {
    if (isFunction(condition) && condition(ctx)) {
      await middleware(ctx, next)
    } else if (isBoolean(condition) && condition) {
      await middleware(ctx, next)
    } else {
      await next()
    }
  }
}
