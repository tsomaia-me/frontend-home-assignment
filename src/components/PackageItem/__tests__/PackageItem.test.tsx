import React from 'react'
import renderer from 'react-test-renderer'
import PackageItem from '../PackageItem'

test('renders PackageItem correctly', () => {
  const json = renderer.create(
    <PackageItem
      item={{
        package: { name: 'test', description: 'test description', dependencies: {} },
        downloadStats: [],
      }}
    />
  ).toJSON()
  expect(json).toMatchSnapshot()
})
