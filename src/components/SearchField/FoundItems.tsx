import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { usePackageStore } from '../../hooks/usePackageStore'
import styles from './SearchField.module.css'
import FoundItem from './FoundItem'

export interface FoundItemsProps {
  onSelect: (packageName: string) => void
}

function FoundItems({ onSelect }: FoundItemsProps) {
  const packageStore = usePackageStore()
  const focusedIndex = useFocusedIndex(packageStore.foundPackages.length)

  return (
    <ul className={styles.list}>
      {packageStore.foundPackages.map((packageName, index) => (
        <FoundItem
          key={packageName}
          packageName={packageName}
          isActive={focusedIndex === index}
          onClick={onSelect}
        />
      ))}
    </ul>
  )
}

function useFocusedIndex(itemsCount: number) {
  const [focusedIndex, setFocusedIndex] = useState(0)

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement as HTMLElement | null

      if (!activeElement || !activeElement.classList.contains('search-field-input')) {
        return
      }

      switch (event.key) {
        case 'ArrowUp': {
          event.preventDefault()
          setFocusedIndex(i => (i - 1) % itemsCount)
          break
        }
        case 'ArrowDown': {
          event.preventDefault()
          setFocusedIndex(i => (i + 1) % itemsCount)
          break
        }
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      setFocusedIndex(0)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [itemsCount])

  return focusedIndex
}

export default observer(FoundItems)
