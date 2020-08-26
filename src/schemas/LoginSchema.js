const Joi = require('@hapi/joi');

const LoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false }, minDomainSegments: 2 })
    .required(),

  password: Joi.string()
    .min(8)
    .max(64)
    .required(),
});

module.exports = LoginSchema;