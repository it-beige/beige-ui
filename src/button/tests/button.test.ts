import Button from '../src/button'
import { render } from '@testing-library/vue'

// base
test('button should work', () => {
  const { getByRole } = render(Button)
  getByRole('button')
})

// default slot
test('default slot should be 按钮', () => {
  const { getByText } = render(Button)
  getByText('按钮')
})

// custom slot
test('default slot should be custom', () => {
  const { getByText } = render(Button, {
    slots: {
      default() {
        return 'custom button'
      }
    }
  })
  getByText('custom button')
})

// secondary
test('default type should be secondary', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'secondary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--secondary')).toBe(true)
})

// custom slot
test('prop type should be primary', () => {
  const { getByRole } = render(Button, {
    props: {
      type: 'primary'
    }
  })
  const button = getByRole('button')
  expect(button.classList.contains('s-btn--primary')).toBe(true)
})
