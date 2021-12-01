import React, { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import styles from './SearchField.module.css'
import { useDebouncedValue, useEnvironment } from '../../hooks'
import { usePackageStore } from '../../hooks/usePackageStore'
import FoundItems from './FoundItems'
import Input from '../Input/Input'

function SearchField() {
  const { debounceTimeout } = useEnvironment()
  const packageStore = usePackageStore()
  const [input, setInput] = useState(packageStore.selectedPackageName ?? '')
  const debouncedInput = useDebouncedValue(input, debounceTimeout)
  const handleInputChange = useCallback((e: ChangeEvent) => setInput((e.target as HTMLInputElement).value), [])
  const selectPackage = useCallback((packageName: string) => {
    (document.activeElement as HTMLInputElement | null)?.blur()
    window.history.pushState({}, '', packageName)
    packageStore.selectPackage(packageName)
  }, [packageStore])
  const handleKeyPress = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      selectPackage(input)
    }
  }, [input, selectPackage])

  useEffect(() => {
    packageStore.searchPackages(debouncedInput)
  }, [debouncedInput, packageStore])

  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <Input
          type="search"
          placeholder="Search packages..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />

        <FoundItems onSelect={selectPackage}/>
      </div>
    </div>
  )
}

export default observer(SearchField)
