const ajv = require('../../libs/ajv')
const utils = require('../../libs/utils')

function assignSchemaAndDataToCtx (ctx, schema, data) {
  ctx.validationSchema = schema
  ctx.validationTarget = data
}

async function validateSchema (ctx) {
  if (!ctx.validationTarget || !ctx.validationSchema) {
    throw utils.errorGenerator(500, 'Someone forgot to set ctx.ValidationTarget or validationSchema!')
  }
  const result = await ajv.validateSchema(ctx.validationSchema, ctx.validationTarget)
  if (!result.success) {
    const E = new Error(result.message)
    E.status = 422
    throw E
  }
  return result
}

module.exports = { assignSchemaAndDataToCtx, validateSchema }
