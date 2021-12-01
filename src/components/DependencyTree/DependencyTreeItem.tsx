import React from 'react'
import styles from './DependencyTree.module.css'

export interface DependencyTreeItemProps extends React.ComponentProps<'li'> {
  isExpanded?: boolean
  isLoading?: boolean
}

function DependencyTreeItem({ isExpanded, isLoading, children, ...restProps }: DependencyTreeItemProps) {
  return (
    <li {...restProps}>
      <div className={styles.left}>
        <span className="material-icons">{isExpanded ? 'expand_less' : 'expand_more'}</span>
        <span>{children}</span>
      </div>
      {isLoading && (
        <div className={styles.spinner}>
          <span className="material-icons">sync</span>
        </div>
      )}
    </li>
  )
}

export default DependencyTreeItem
