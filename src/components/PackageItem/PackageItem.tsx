import React from 'react'
import ReactMarkdown from 'react-markdown'

import styles from './PackageItem.module.css'
import { PackageDetails } from '../../models'
import DownloadStats from './DownloadStats'

export interface PackageProps {
  item: PackageDetails
}

function PackageItem({ item }: PackageProps) {
  return (
    <article className={styles.root}>
      <div className={styles.main}>
        <div className={styles.contentWrapper}>
          {item.readme ? (
            <ReactMarkdown>
              {item.readme}
            </ReactMarkdown>
          ) : (
             <>
               <h2 className={styles.title}>{item.package.name}</h2>
               <div>{item.package.description || 'No description available for this package.'}</div>
             </>
           )}
        </div>
      </div>

      <aside className={styles.sidebar}>
        <ul className={styles.details}>
          {item.package.homepage && (
            <li>
              <span className="material-icons">link</span>
              <a href={item.package.homepage?.toString()} target="_blank" rel="noreferrer">
                {item.package.homepage?.toString()}
              </a>
            </li>
          )}
          {item.package.repository?.url && (
            <li>
              <span className="material-icons">code</span>
              <a href={item.package.repository.url} target="_blank" rel="noreferrer">
                {item.package.repository.url}
              </a>
            </li>
          )}
          {item.package.license && (
            <li>
              <span className="material-icons">balance</span>
              <span>{item.package.license}</span>
            </li>
          )}
          <li>
            <DownloadStats downloadStats={item.downloadStats}/>
          </li>
        </ul>
      </aside>
    </article>
  )
}

export default PackageItem
