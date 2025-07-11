import fs from 'fs'
import path from 'path'

const envVarRegex = /\bprocess\.env\.([A-Z0-9_]+)/g

export function scanEnvVarsFromCode(): string[] {
  const vars = new Set<string>()
  const files = fs.readdirSync(process.cwd())

  files.forEach(file => {
    if (!file.endsWith('.js') && !file.endsWith('.ts')) return

    const content = fs.readFileSync(path.join(process.cwd(), file), 'utf8')
    let match
    while ((match = envVarRegex.exec(content))) {
      vars.add(match[1])
    }
  })

  return Array.from(vars)
}