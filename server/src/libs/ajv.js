const Ajv = require('ajv')
const ajvInstance = new Ajv({ allErrors: true })

async function validateSchema (schema, data, ajv = ajvInstance) {
  if (await ajv.validate(schema, data)) {
    return { success: true, message: '' }
  }
  return { success: false, message: `${ajv.errorsText()}` }
}

const REGISTRATION_SCHEMA = {
  id: 'REGISTRATION_SCHEMA',
  $async: true,
  properties: {
    email: {
      type: 'string',
      format: 'email'
    },
    password: {
      type: 'string',
      pattern: '^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$' // https://stackoverflow.com/questions/5859632/regular-expression-for-password-validation
    }
  },
  required: ['email', 'password']
}
const AUTH_SCHEMA = REGISTRATION_SCHEMA
const JWT_TOKEN_SCHEMA = {
  id: 'JWT_TOKEN_SCHEMA',
  $async: true,
  properties: {
    email: {
      type: 'string'
    },
    role: {
      type: 'string',
      pattern: 'admin|user'
    }
  },
  required: ['email', 'role']
}

module.exports = { validateSchema, REGISTRATION_SCHEMA, AUTH_SCHEMA, JWT_TOKEN_SCHEMA }
