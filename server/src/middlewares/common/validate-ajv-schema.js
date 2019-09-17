const ajv = require('../../libs/ajv')
const utils = require('../../libs/utils')

function assignSchemaAndDtaToCtx (ctx, schema, data) {
  ctx.validationSchema = schema
  ctx.validationTarget = data
}

async function validateSchema (ctx, next) {
  if (!ctx.validationTarget || !ctx.validationSchema) {
    throw utils.errorGenerator(500, 'Someone forgot to set ctx.ValidationTarget or validationSchema!')
  }
  const result = await ajv.validateSchema(ctx.validationSchema, ctx.validationTarget)
  if (!result.success) {
    throw utils.errorGenerator(422, `${result.message}`)
  }
}

module.exports = { assignSchemaAndDtaToCtx, validateSchema }
