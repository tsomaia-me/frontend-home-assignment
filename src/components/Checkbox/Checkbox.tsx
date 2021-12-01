import React from 'react'
import styles from './Checkbox.module.css'

export interface CheckboxProps extends React.ComponentProps<'input'> {
  label?: React.ReactNode
}

function Checkbox({ label, ...restProps }: CheckboxProps) {
  return (
    <label className={styles.root}>
      <input {...restProps} type="checkbox"/>
      <span>{label}</span>
    </label>
  )
}

export default Checkbox
