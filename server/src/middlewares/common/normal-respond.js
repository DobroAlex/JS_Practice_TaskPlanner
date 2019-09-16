async function normalRespond (ctx, next) {
  if (!ctx.status) {
    ctx.status = 200
  }
  if (!ctx.message) {
    ctx.message = 'Some retard forgot to set up response message. Everything else seems to be fine'
  }
  ctx.send(ctx.status, ctx.message)
}

module.exports = { normalRespond }
