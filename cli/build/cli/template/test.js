'use strict'
exports.__esModule = true
var utils_1 = require('./utils')
function genTestTemplate(name) {
  var compName = (0, utils_1.upperFirst)(name)
  return '\nimport '
    .concat(compName, " from '../src/")
    .concat(
      name,
      "'\nimport { render } from '@testing-library/vue'\n\n// base\ntest('"
    )
    .concat(name, " should work', () => {\n  const { getByRole } = render(")
    .concat(name, ")\n  getByRole('")
    .concat(
      name,
      "')\n})\n\n// default slot\ntest('default slot should be \u6309\u94AE', () => {\n  const { getByText } = render("
    )
    .concat(
      name,
      ")\n  getByText('\u6309\u94AE')\n})\n\n// custom slot\ntest('default slot should be custom', () => {\n  const { getByText } = render("
    )
    .concat(
      name,
      ", {\n    slots: {\n      default() {\n        return 'custom "
    )
    .concat(name, "'\n      }\n    }\n  })\n  getByText('custom ")
    .concat(
      name,
      "')\n})\n\n// secondary\ntest('default type should be secondary', () => {\n  const { getByRole } = render("
    )
    .concat(
      name,
      ", {\n    props: {\n      type: 'secondary'\n    }\n  })\n  const "
    )
    .concat(name, " = getByRole('")
    .concat(name, "')\n  expect(")
    .concat(
      name,
      ".classList.contains('s-btn--secondary')).toBe(true)\n})\n\n// custom slot\ntest('prop type should be primary', () => {\n  const { getByRole } = render("
    )
    .concat(
      name,
      ", {\n    props: {\n      type: 'primary'\n    }\n  })\n  const "
    )
    .concat(name, " = getByRole('")
    .concat(name, "')\n  expect(")
    .concat(name, ".classList.contains('s-btn--primary')).toBe(true)\n})\n\n  ")
}
exports['default'] = genTestTemplate
