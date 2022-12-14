'use strict'

// ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: 'suggestion',
    fixable: 'code',
    schema: [], // no options
    messages: {
      avoidName: "Avoid using variables named '{{ name }}'"
    }
  },
  create: function (context) {
    return {
      Identifier(node) {
        if (node.name === 'foo') {
          context.report({
            node,
            messageId: 'avoidName',
            data: {
              name: 'foo'
            }
          })
        }
      }
    }
  }
}
