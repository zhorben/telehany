const Koa = require('koa')
const next = require('next')
const KoaRouter = require('koa-router')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const server = new Koa()
  const router = new KoaRouter()

  // router.get('/a', async ctx => {
  //   await app.render(ctx.req, ctx.res, '/a', ctx.query)
  //   ctx.respond = false
  // })

  router.get('/confirm/:verificationToken', async ctx => {
    await app.render(ctx.req, ctx.res, '/confirm', { verificationToken: ctx.params.verificationToken })
    ctx.respond = false
  })

  router.get('/brand/:id', async ctx => {
    await app.render(ctx.req, ctx.res, '/brand', { id: ctx.params.id })
    ctx.respond = false
  })

  router.all('*', async ctx => {
    await handle(ctx.req, ctx.res)
    ctx.respond = false
  })

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200
    await next()
  })

  server.use(router.routes())
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`)
  })
})
