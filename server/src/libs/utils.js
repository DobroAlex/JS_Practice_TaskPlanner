async function errorGenerator (status, message) {
  const e = new Error(message)
  e.status = status
  return e
}

function ctxResponseSetter (ctx, status, message) {
  ctx.status = status
  ctx.message = message
}

module.exports = { errorGenerator, ctxResponseSetter }
