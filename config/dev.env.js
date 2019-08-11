'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_HOST:'"/api/"'
  // BASE_API:'"http://111.13.18.10:8090"',
})
