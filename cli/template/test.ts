import { upperFirst } from './utils'

export default function genTestTemplate(name: string): string {
  const compName = upperFirst(name)
  return `
import ${compName} from '../src/${name}'
import { render } from '@testing-library/vue'

// base
test('${name} should work', () => {
  const { getByRole } = render(${name})
  getByRole('${name}')
})

// default slot
test('default slot should be 按钮', () => {
  const { getByText } = render(${name})
  getByText('按钮')
})

// custom slot
test('default slot should be custom', () => {
  const { getByText } = render(${name}, {
    slots: {
      default() {
        return 'custom ${name}'
      }
    }
  })
  getByText('custom ${name}')
})

// secondary
test('default type should be secondary', () => {
  const { getByRole } = render(${name}, {
    props: {
      type: 'secondary'
    }
  })
  const ${name} = getByRole('${name}')
  expect(${name}.classList.contains('s-btn--secondary')).toBe(true)
})

// custom slot
test('prop type should be primary', () => {
  const { getByRole } = render(${name}, {
    props: {
      type: 'primary'
    }
  })
  const ${name} = getByRole('${name}')
  expect(${name}.classList.contains('s-btn--primary')).toBe(true)
})

  `
}
