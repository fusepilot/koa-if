# koa-if

Conditionally run middleware in Koa

*Note: only tested with the new async/await style middleware in koa 2*

## Install

```bash
npm install --save koa-if
```

## API

* `middleware` middleware to run if condition is truthy.
* `condition` either a boolean or a function that returns a boolean. Functions are passed the current context.

## Usage:

```javascript
const Koa = require('koa')
const app = new Koa()
const test = require('koa-if')

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
```

Now, ````localhost:3000/special```` will show "Special" while all other urls will show "Normal".

## License

MIT
