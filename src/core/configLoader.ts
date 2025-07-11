import * as fs from 'fs'
import * as path from 'path'
import * as YAML from 'yaml'
import { StackCheckSchema } from './configSchema'

interface StackCheckConfig {
  node?: string
  docker?: boolean
  env?: string[]
  ports?: number[]
  custom?: string[]
  genEnv?: boolean
  report?: string
  telemetry?: boolean
  init?: boolean
}


export function loadConfig(env?: string): StackCheckConfig {
  // const base = env ? `.stackcheck.${env}` : `.stackcheck`
  const base = env?.trim() ? `.stackcheck.${env.trim()}` : `.stackcheck`
  const jsonPath = path.resolve(`${base}.json`)
  console.log('Looking for config at:', jsonPath)
  const ymlPath = path.resolve(`${base}.yml`)
  console.log('Looking for config at:', ymlPath)

  let configRaw: any

  if (fs.existsSync(jsonPath)) {
    configRaw = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  } else if (fs.existsSync(ymlPath)) {
    configRaw = YAML.parse(fs.readFileSync(ymlPath, 'utf8'))
  } else {
    console.error(`❌ No config file found.`)
    process.exit(1)
  }

  const validated = StackCheckSchema.safeParse(configRaw)
  if (!validated.success) {
    console.error('❌ Invalid .stackcheck config:', validated.error.format())
    process.exit(1)
  }

  return validated.data
}