const Joi = require('@hapi/joi');

const RegisterSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false }, minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(8)
    .max(64)
    .required(),
});

module.exports = RegisterSchema;