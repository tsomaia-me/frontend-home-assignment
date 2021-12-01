import { computed, flow, makeObservable, observable } from 'mobx'

import { PackageDetails } from '../models'
import { fetchDownloadStats, fetchPackage, fetchReadme, searchPackages } from '../fetchers'

class PackageStore {
  isTopLevelPackageLoading = false
  foundPackages = [] as Array<string>
  selectedPackageName = null as string | null
  packages = {} as Record<string, PackageDetails>

  constructor() {
    makeObservable(this, {
      isTopLevelPackageLoading: observable,
      foundPackages: observable,
      selectedPackageName: observable,
      packages: observable,
      selectedPackage: computed,
      topLevelDependencyList: computed,
      searchPackages: flow,
      selectPackage: flow,
      loadPackageDetails: flow,
    })
  }

  get selectedPackage() {
    return this.selectedPackageName === null ? null : this.packages[this.selectedPackageName]
  }

  get topLevelDependencyList() {
    return Object.keys(this.selectedPackage?.package.dependencies ?? {})
  }

  * searchPackages(keyword: string): Generator<Promise<unknown>, void, any> {
    this.foundPackages = yield searchPackages(keyword)
  }

  * selectPackage(packageName: string): Generator<Promise<unknown>, void, any> {
    this.selectedPackageName = packageName

    if (!packageName) {
      return
    }

    this.isTopLevelPackageLoading = true
    this.packages[packageName] = {
      package: yield fetchPackage(packageName),
      readme: yield fetchReadme(packageName),
      downloadStats: yield fetchDownloadStats(packageName),
    }
    this.isTopLevelPackageLoading = false
  }

  * loadPackageDetails(packageName: string): Generator<Promise<unknown>, void, any> {
    this.packages[packageName] = {
      package: yield fetchPackage(packageName),
      readme: yield fetchReadme(packageName),
      downloadStats: observable([]),
    }
  }
}

export default PackageStore
