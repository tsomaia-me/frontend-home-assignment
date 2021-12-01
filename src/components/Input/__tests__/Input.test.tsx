import React from 'react'
import renderer from 'react-test-renderer'
import Input from '../Input'

test('renders Input correctly', () => {
  const json = renderer.create(<Input/>).toJSON()
  expect(json).toMatchSnapshot()
})
