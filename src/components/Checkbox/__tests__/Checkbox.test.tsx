import React from 'react'
import renderer from 'react-test-renderer'
import Checkbox from '../Checkbox'

test('renders Checkbox correctly', () => {
  const json = renderer.create(<Checkbox/>).toJSON()
  expect(json).toMatchSnapshot()
})
