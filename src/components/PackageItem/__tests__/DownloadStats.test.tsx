import React from 'react'
import renderer from 'react-test-renderer'
import DownloadStats from '../DownloadStats'

test('renders DownloadStats correctly', () => {
  const json = renderer.create(<DownloadStats downloadStats={[]}/>).toJSON()
  expect(json).toMatchSnapshot()
})
