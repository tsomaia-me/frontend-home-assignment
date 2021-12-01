import React from 'react'
import { observer } from 'mobx-react'
import { usePackageStore } from '../../hooks/usePackageStore'
import styles from './SearchField.module.css'
import FoundItem from './FoundItem'

export interface FoundItemsProps {
  onSelect: (packageName: string) => void
}

function FoundItems({ onSelect }: FoundItemsProps) {
  const packageStore = usePackageStore()

  return (
    <ul className={styles.list}>
      {packageStore.foundPackages.map(packageName => (
        <FoundItem
          key={packageName}
          packageName={packageName}
          onClick={onSelect}
        />
      ))}
    </ul>
  )
}

export default observer(FoundItems)
