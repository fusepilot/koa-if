const Koa = require('koa')
const app = new Koa()
const test = require('../')

async function normalMiddleware(ctx, next) {
  if (!ctx.body) ctx.body = '<h1>Normal</h1>'
  await next()
}

async function specialMiddleware(ctx, next) {
  if (!ctx.body) ctx.body = '<h1>Special</h2>'
  await next()
}

app.use(test(specialMiddleware, (ctx) => {
  return ctx.url == '/special'
}))

app.use(normalMiddleware)

app.listen(3000)
