import React from 'react'
import renderer from 'react-test-renderer'
import DependencyTree from '../DependencyTree'

test('renders DependencyTree correctly', () => {
  const json = renderer.create(<DependencyTree dependencies={[]}/>).toJSON()
  expect(json).toMatchSnapshot()
})
