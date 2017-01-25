import { get, set } from 'lodash';

export default function ({ types: t }) {
  return {
    visitor: {
      ImportDeclaration(path) {
        if (get(path, 'node.source.value') === 'reselect') {
          set(path, 'node.source.value', 'reselect-change-memoize');
        }
      },
      CallExpression(path) {
        if (
          get(path, 'node.callee.name') === 'require' &&
          get(path, 'node.arguments[0].value') === 'reselect'
        ) {
          set(path, 'node.arguments[0].value', 'reselect-change-memoize');
        }
      },
      VariableDeclaration(path) {
        if (
          t.isCallExpression(get(path, 'node.declarations[0].init')) &&
          get(path, 'node.declarations[0].init.callee.name') === 'createSelector' &&
          get(path, 'node.declarations[0].init.arguments')
        ) {
          const selectorName = get(path, 'node.declarations[0].id.name');
          path.node.declarations[0].init.arguments
            .unshift(t.stringLiteral(selectorName));
        }
      }
    }
  };
}
