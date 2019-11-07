const joi = require('joi')

const fieldSchema = joi.object({
  id: joi.string().required(),
  type: joi.string().required(),
  title: joi.string().required(),
  answer: joi.any().required()
})

const questionSchema = joi.object({
  id: joi.string().required(),
  category: joi.string().optional(),
  question: joi.string().required(),
  fields: joi.array().items(fieldSchema)
})

const feeDetailSchema = joi.object({
  description: joi.string().required(),
  amount: joi.number().required(),
})

const feesSchema = joi.object({
  details: joi.array().items(feeDetailSchema),
  receipt: joi.string().required(),
  total: joi.number().required()
}).optional()

const metadataSchema = joi.object().keys({
  post: joi.string(),
  caseType: joi.string(),
  summary: joi.string()
})

const caseManagementSchema = joi.object().keys({
  id: joi.string().required(),
  name: joi.string().required(),
  preferredLanguage: joi.string().optional(),
  fees: feesSchema,
  questions: joi.array().items(questionSchema),
  metadata: metadataSchema
})

module.exports = {
  caseManagementSchema
}
