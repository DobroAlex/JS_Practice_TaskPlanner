async function errorHandle (context, next) {
  try {
    await next()
  } catch (e) {
    console.log(`Error occured: ${e}`)
    context.status = 500 // Iternal server error as default, should be normally changed by middlewares
    if (e.status) {
      context.status = e.status
    }
    context.send(context.status, `${e}`)
  }
}

module.exports = { errorHandle }
