import Test from './Test'
import { render } from '@testing-library/vue'

test('Test.tsx should work', () => {
  const { getByText } = render(Test)
  getByText('test: 0')
})
