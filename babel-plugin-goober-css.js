const syntax = require("@babel/plugin-syntax-jsx").default;

module.exports = function (
  babel /*: any */,
  { target = "auto" } /*: Options */
) {
  const { types: t } = babel;

  return {
    inherits: syntax,

    visitor: {
      Program: {
        enter(path /*: any */, state /*: State */) {
          // Whether we've inserted the require statement
          state.required = false;
          // Nodes to insert
          state.items = [];
        },

        exit(path /*: any */, state /*: State */) {
          // Add the new nodes to the end of the program
          path.node.body.push(...state.items);
        },
      },

      JSXAttribute(path /*: any */, state /*: State */) {
        if (path.node.name.name !== "css") {
          // Don't do anything if we didn't find an attribute named 'css'
          return;
        }

        // Get all the bindings in the program scope
        const { bindings } = path.findParent((p) => p.type === "Program").scope;

        if (!state.required) {
          // If we haven't inserted a require statement, now is the time
          if (!bindings.styled) {
            // The binding doesn't exist, we need to insert the require
            state.items.push(
              t.variableDeclaration("var", [
                t.variableDeclarator(
                  t.identifier("styled"),
                  t.memberExpression(
                    t.callExpression(t.identifier("require"), [
                      t.stringLiteral("goober"),
                    ]),
                    t.identifier("styled")
                  )
                ),
              ])
            );
          }

          state.required = true;
        }

        const elem = path.parentPath;
        const id = path.scope.generateUidIdentifier(
          "CSS" +
            elem.node.name.name.replace(/^([a-z])/, (match, p1) =>
              p1.toUpperCase()
            )
        );

        const tag = elem.node.name.name;
        const styled = t.callExpression(t.identifier("styled"), [
          /^[a-z]/.test(tag) ? t.stringLiteral(tag) : t.identifier(tag),
        ]);

        let css;

        if (t.isStringLiteral(path.node.value)) {
          css = t.templateLiteral(
            [t.templateElement({ raw: path.node.value.value }, true)],
            []
          );
        } else if (t.isJSXExpressionContainer(path.node.value)) {
          if (t.isTemplateLiteral(path.node.value.expression)) {
            css = path.node.value.expression;
          } else {
            css = t.templateLiteral(
              [
                t.templateElement({ raw: "" }, false),
                t.templateElement({ raw: "" }, true),
              ],
              [path.node.value.expression]
            );
          }
        }

        if (!css) {
          return;
        }

        elem.node.attributes = elem.node.attributes.filter(
          (attr) => attr !== path.node
        );
        elem.node.name.name = id.name;

        if (elem.parentPath.node.closingElement) {
          elem.parentPath.node.closingElement.name.name = id.name;
        }

        css.expressions = css.expressions.reduce((acc, ex) => {
          if (
            Object.entries(bindings).some(([, b]) =>
              b.referencePaths.find((p) => p.node === ex)
            ) ||
            t.isFunctionExpression(ex) ||
            t.isArrowFunctionExpression(ex)
          ) {
            acc.push(ex);
          } else {
            const name = path.scope.generateUidIdentifier(`css`);
            const p = t.identifier("p");

            elem.node.attributes.push(
              t.jSXAttribute(
                t.jSXIdentifier(name.name),
                t.jSXExpressionContainer(ex)
              )
            );

            acc.push(
              t.arrowFunctionExpression([p], t.memberExpression(p, name))
            );
          }

          return acc;
        }, []);

        state.items.push(
          t.variableDeclaration("var", [
            t.variableDeclarator(id, t.taggedTemplateExpression(styled, css)),
          ])
        );
      },
    },
  };
};
