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
  const numberOfDays = environment.numberOfDownloadStatsDays
  const days = Array(numberOfDays).fill(null).map((_, i) => numberOfDays + 1 - i)

  return await Promise.all(days.map(dayOffset => fetchDownloadsBefore(packageName, dayOffset)))
}

export async function fetchDownloadsBefore(packageName: string, dayOffset: number) {
  const baseUrl = environment.packageStatsApiBaseUrl
  const formattedDate = DateTime.now().minus({ day: dayOffset }).toISODate()
  const response = await fetch(`${baseUrl}/${formattedDate}:${formattedDate}/${packageName}`)
  const result = await response.json()

  return result.downloads
}
