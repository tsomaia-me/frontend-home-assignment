import React from 'react'
import renderer from 'react-test-renderer'
import FoundItem from '../FoundItem'

test('renders FoundItem correctly', () => {
  const json = renderer.create(
    <FoundItem
      packageName="react"
      onClick={console.log}
    />
  ).toJSON()
  expect(json).toMatchSnapshot()
})
