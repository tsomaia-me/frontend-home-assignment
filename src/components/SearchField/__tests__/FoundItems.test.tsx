import React from 'react'
import renderer from 'react-test-renderer'
import FoundItems from '../FoundItems'

test('renders FoundItems correctly', () => {
  const json = renderer.create(<FoundItems onSelect={console.log}/>).toJSON()
  expect(json).toMatchSnapshot()
})
