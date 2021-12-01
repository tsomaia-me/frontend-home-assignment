import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'

test('renders App correctly', () => {
  const json = renderer.create(<App/>).toJSON()
  expect(json).toMatchSnapshot()
})
