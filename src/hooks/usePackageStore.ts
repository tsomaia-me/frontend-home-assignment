import { useContext } from 'react'
import { PackageStoreContext } from '../contexts'

export function usePackageStore() {
  return useContext(PackageStoreContext)
}
