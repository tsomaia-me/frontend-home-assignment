import { when } from 'mobx'
import PackageStore from '../PackageStore'

jest.setTimeout(50000)

describe('PackageStore', () => {
  it('loads array of package name strings when searchPackages action is called', done => {
    const store = new PackageStore()
    store.searchPackages('react')
    when(() => store.foundPackages.length > 0, () => {
      expect(store.foundPackages[0]).toEqual('react')
      done()
    })
  })

  it('sets isTopLevelPackageLoading to true when selectPackage action is called', () => {
    const store = new PackageStore()
    store.selectPackage('react')
    expect(store.isTopLevelPackageLoading).toBe(true)
  })

  it(
    'loads package and download stats under packages with respective name when selectPackage action is called',
    done => {
      const store = new PackageStore()
      store.selectPackage('react')
      when(() => Object.keys(store.packages).length > 0, () => {
        expect(store.packages[Object.keys(store.packages)[0]].package.name).toEqual('react')
        expect(store.packages[Object.keys(store.packages)[0]].downloadStats.length).toBeGreaterThan(0)
        done()
      })
    }
  )

  it('sets isTopLevelPackageLoading to false when selectPackage action is complete', done => {
    const store = new PackageStore()
    store.selectPackage('react')
    when(() => Object.keys(store.packages).length > 0, () => {
      expect(store.isTopLevelPackageLoading).toBe(false)
      done()
    })
  })

  it(
    'loads package and empty download stats under packages with respective name when loadPackageDetails action is called',
    done => {
      const store = new PackageStore()
      store.loadPackageDetails('react')
      when(() => Object.keys(store.packages).length > 0, () => {
        expect(store.packages[Object.keys(store.packages)[0]].package.name).toEqual('react')
        expect(store.packages[Object.keys(store.packages)[0]].downloadStats.length).toEqual(0)
        done()
      })
    }
  )
})
