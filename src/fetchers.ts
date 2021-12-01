import environment from './environment'
import { DateTime } from 'luxon'
import { FoundPackageObject } from './models'

export async function searchPackages(keyword: string) {
  const response = await fetch(`${environment.packageSearchApiBaseUrl}?text=${keyword}`)
  const result = await response.json()

  return result.objects.map((item: FoundPackageObject) => item.package.name) as Array<string>
}

export async function fetchPackage(packageName: string) {
  const response = await fetch(`${environment.packageDetailsApiBaseUrl}/${packageName}/package.json`)

  return await response.json()
}

export async function fetchDownloadStats(packageName: string) {
  const data = []
  const date = DateTime.now()
  const numberOfDays = environment.numberOfDownloadStatsDays
  const baseUrl = environment.packageStatsApiBaseUrl

  for (let offset = numberOfDays + 1; offset > 0; --offset) {
    const formattedDate = date.minus({ day: offset }).toISODate()
    const response = await fetch(`${baseUrl}/${formattedDate}:${formattedDate}/${packageName}`)
    const result = await response.json()
    data.push(result.downloads)
  }

  return data
}
