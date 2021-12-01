import { useContext } from 'react'
import { EnvironmentContext } from '../contexts'

export function useEnvironment() {
  return useContext(EnvironmentContext)
}
