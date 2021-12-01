import devEnvironmentProperties from './environment.dev'
import prodEnvironmentProperties from './environment.prod'

const environment = process.env.NODE_ENV === 'development'
                    ? devEnvironmentProperties
                    : prodEnvironmentProperties

export default environment
