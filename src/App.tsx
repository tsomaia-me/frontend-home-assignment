import React, { useCallback, useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import styles from './App.module.css'
import SearchField from './components/SearchField'
import PackageItem from './components/PackageItem/PackageItem'
import DependencyTree from './components/DependencyTree/DependencyTree'
import { usePackageStore } from './hooks/usePackageStore'
import Checkbox from './components/Checkbox'
import LoadingBurger from './components/LoadingBurger'

function App() {
  const packageStore = usePackageStore()
  const selectedPackage = packageStore.selectedPackage
  const [isAllExpanded, setIsAllExpanded] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)
  const toggleIsAllExpanded = useCallback(() => setIsAllExpanded(value => !value), [])

  useEffect(() => {
    packageStore.selectPackage(window.location.pathname.substring(1))
    setIsHydrated(true)
  }, [packageStore])

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        NPM Package Database
      </header>

      <section className={styles.middle}>
        <aside className={styles.sidebar}>
          {isHydrated && <SearchField/>}
          <Checkbox
            label="Get entire tree"
            onClick={toggleIsAllExpanded}
          />
          <div className={styles.tree}>
            <DependencyTree
              dependencies={packageStore.topLevelDependencyList}
              isAllExpanded={isAllExpanded}
            />
          </div>
        </aside>

        <main className={styles.content}>
          {selectedPackage ? <PackageItem item={selectedPackage}/> : (
            <LoadingBurger isAnimationEnabled={packageStore.isTopLevelPackageLoading}/>
          )}
        </main>
      </section>
    </div>
  )
}

export default observer(App)
