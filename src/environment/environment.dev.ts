const devEnvironmentProperties = {
  packageSearchApiBaseUrl: 'https://registry.npmjs.org/-/v1/search',
  // packageDetailsApiBaseUrl: 'https://registry.npmjs.org',
  packageDetailsApiBaseUrl: 'https://unpkg.com',
  packageStatsApiBaseUrl: 'https://api.npmjs.org/downloads/point/',
  debounceTimeout: 250, //ms
  numberOfDownloadStatsDays: 7,
}

export default devEnvironmentProperties
