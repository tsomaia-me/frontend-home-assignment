import React from 'react'

import styles from './LoadingBurger.module.css'

export interface LoadingBurgerProps {
  isAnimationEnabled: boolean
}

function LoadingBurger({ isAnimationEnabled }: LoadingBurgerProps) {
  return (
    <div className={`${styles.root}${isAnimationEnabled ? ' ' + styles.animated : ''}`}>
      <span className="material-icons">lunch_dining</span>
    </div>
  )
}

export default LoadingBurger
