import React from 'react'
import styles from './Input.module.css'

export interface InputProps extends React.ComponentProps<'input'> {
}

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className={props.className ? `${props.className} ${styles.root}` : styles.root}
    />
  )
}

export default Input
