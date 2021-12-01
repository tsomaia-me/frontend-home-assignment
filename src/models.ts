export interface FoundPackageObject {
  package: Package
}

export interface Package {
  name: string
}

export interface PackageDetails {
  package: PackageJsonDetails
  downloadStats: Array<number>
}

export interface PackageJsonDetails {
  name: string
  description: string
  license?: string
  homepage?: string
  repository?: { url: string }
  dependencies: Record<string, string>
}
