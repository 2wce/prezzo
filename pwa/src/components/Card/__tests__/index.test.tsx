import * as React from 'react'
import Card from '../'
import { render } from '../../../utils/test-utils'

describe('<Card />', () => {
  const setup = () => {
    const utils = render(
      <Card>
        <div>i have children</div>
      </Card>
    )
    return { ...utils }
  }

  test('should render without crashing', () => {
    const { container } = setup()
    expect(container).toBeTruthy()
  })

  test('should render children', () => {
    const { getByText } = setup()
    const child = getByText(/i have children/i)
    expect(child).toBeDefined()
  })
})
