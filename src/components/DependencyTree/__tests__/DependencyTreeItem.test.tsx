import React from 'react'
import renderer from 'react-test-renderer'
import DependencyTreeItem from '../DependencyTreeItem'

test('renders DependencyTreeItem correctly', () => {
  const json = renderer.create(<DependencyTreeItem/>).toJSON()
  expect(json).toMatchSnapshot()
})
