import fs from 'fs'
import path from 'path'

const suspiciousPatterns: RegExp[] = [
  /sk-\w{20,}/i,                   // OpenAI-like keys
  /eyJ[a-zA-Z0-9_-]{30,}\./,      // JWT-like
  /(?:api|access|auth|secret).*key.*=\w{20,}/i,  // general API keys
  /(?:token|password|secret).{0,10}=\w{12,}/i,
  /private_key/i
]

export function checkEnvSecrets(): { passed: string[], failed: string[] } {
  const envPath = path.resolve(process.cwd(), '.env')
  const passed: string[] = []
  const failed: string[] = []

  if (!fs.existsSync(envPath)) {
    passed.push(`.env file not found — skipping secret check`)
    return { passed, failed }
  }

  const contents = fs.readFileSync(envPath, 'utf8')
  const lines = contents.split('\n')

  for (const line of lines) {
    const cleanLine = line.trim()
    if (cleanLine.startsWith('#') || cleanLine === '') continue

    for (const pattern of suspiciousPatterns) {
      if (pattern.test(cleanLine)) {
        failed.push(`⚠️  Potential secret detected: "${cleanLine}"`)
        break
      }
    }
  }

  if (failed.length === 0) {
    passed.push('No obvious secrets found in .env')
  }

  return { passed, failed }
}