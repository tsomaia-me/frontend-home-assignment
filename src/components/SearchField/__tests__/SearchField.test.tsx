import React from 'react'
import renderer from 'react-test-renderer'
import SearchField from '../SearchField'

test('renders SearchField correctly', () => {
  const json = renderer.create(<SearchField/>).toJSON()
  expect(json).toMatchSnapshot()
})
