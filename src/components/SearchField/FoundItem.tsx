import React, { useCallback, useEffect } from 'react'

import styles from './SearchField.module.css'

export interface FoundItemProps {
  packageName: string
  isActive: boolean
  onClick: (item: string) => void
}

function FoundItem({ packageName, isActive, onClick }: FoundItemProps) {
  const handleClick = useCallback(() => onClick(packageName), [packageName, onClick])

  useEnterListener({ isActive, onEnter: handleClick })

  return (
    <li className={isActive ? styles.active : ''} onMouseDown={handleItemMouseDown} onClick={handleClick}>
      {packageName}
    </li>
  )
}

function useEnterListener({ isActive, onEnter }: {
  isActive: boolean
  onEnter: () => void
}) {
  useEffect(() => {
    if (!isActive) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        onEnter()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isActive, onEnter])
}

function handleItemMouseDown(event: React.MouseEvent) {
  event.preventDefault()
}

export default FoundItem
