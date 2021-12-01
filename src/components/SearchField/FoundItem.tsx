import React, { useCallback } from 'react'

export interface FoundItemProps {
  packageName: string
  onClick: (item: string) => void
}

function FoundItem({ packageName, onClick }: FoundItemProps) {
  const handleClick = useCallback(() => onClick(packageName), [packageName, onClick])

  return (
    <li onMouseDown={handleItemMouseDown} onClick={handleClick}>
      {packageName}
    </li>
  )
}

function handleItemMouseDown(event: React.MouseEvent) {
  event.preventDefault()
}

export default FoundItem
