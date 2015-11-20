const isFunction = require('lodash/lang/isFunction')
const isBoolean = require('lodash/lang/isBoolean')

module.exports = function(middleware, condition=true) {
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
