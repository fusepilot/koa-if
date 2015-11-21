import Koa from 'koa'
import test from '../src'

const app = new Koa()

async function normalMiddleware(ctx, next) {
  if (!ctx.body) ctx.body = '<h1>Normal</h1>'
  await next()
}

async function specialMiddleware(ctx, next) {
  if (!ctx.body) ctx.body = '<h1>Special</h2>'
  await next()
}

app.use(normalMiddleware)

// only run specialMiddleware on /special
app.use(test(specialMiddleware, (ctx) => {
  return ctx.url == '/special'
}))

app.listen(3000)
