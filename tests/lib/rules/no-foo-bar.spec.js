const { RuleTester } = require('eslint')
const noFooVarRule = require('../../../lib/rules/no-foo-var.js')

const ruleTester = new RuleTester()

ruleTester.run('no-empty-catch', noFooVarRule, {
  valid: [{
    code: 'let bar = 1'
  }],
  invalid: [{
    code: 'let foo = 1',
    // we can use messageId from the rule object
    errors: [{ messageId: 'avoidName' }]
  }]
})
