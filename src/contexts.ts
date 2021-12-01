import { createContext } from 'react'
import environment from './environment'
import PackageStore from './stores/PackageStore'

export const EnvironmentContext = createContext(environment)
export const PackageStoreContext = createContext(new PackageStore())
