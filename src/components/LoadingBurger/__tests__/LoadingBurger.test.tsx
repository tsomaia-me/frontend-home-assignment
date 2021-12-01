import React from 'react'
import renderer from 'react-test-renderer'
import LoadingBurger from '../LoadingBurger'

test('renders LoadingBurger correctly', () => {
  const json = renderer.create(<LoadingBurger isAnimationEnabled={true}/>).toJSON()
  expect(json).toMatchSnapshot()
})
