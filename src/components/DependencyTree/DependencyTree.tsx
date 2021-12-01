import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import styles from './DependencyTree.module.css'
import { usePackageStore } from '../../hooks/usePackageStore'
import DependencyTreeItem from './DependencyTreeItem'

export interface DependencyTreeProps {
  dependencies: Array<string>
  depth?: number
  isAllExpanded?: boolean
}

export interface DependencyItemProps {
  packageName: string
  depth: number
  isAllExpanded: boolean
}

function DependencyTree({ dependencies, depth = 0, isAllExpanded = false }: DependencyTreeProps) {
  return (
    <ul className={styles.root}>
      {dependencies.map(packageName => (
        <DependencyItem
          key={packageName}
          packageName={packageName}
          depth={depth}
          isAllExpanded={isAllExpanded}
        />
      ))}
    </ul>
  )
}

const DependencyItem = observer(({ packageName, isAllExpanded, depth }: DependencyItemProps) => {
  const packageStore = usePackageStore()
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpansion = useCallback(() => setIsExpanded(value => !value), [])
  const packageDetails = packageStore.packages[packageName]

  useEffect(() => {
    if (isExpanded) {
      packageStore.loadPackageDetails(packageName)
    }
  }, [packageName, isExpanded, packageStore])

  useEffect(() => {
    if (isAllExpanded) {
      setIsExpanded(true)
    }
  }, [isAllExpanded])

  return (
    <>
      <DependencyTreeItem
        isExpanded={isExpanded}
        isLoading={isExpanded && !packageDetails}
        style={{ paddingLeft: 8 + (24 * depth) }}
        children={packageName}
        onClick={toggleExpansion}
      />

      {isExpanded && packageDetails && (
        <DependencyTree
          dependencies={Object.keys(packageDetails.package.dependencies ?? {})}
          depth={depth + 1}
          isAllExpanded={isAllExpanded}
        />
      )}
    </>
  )
})

export default DependencyTree
