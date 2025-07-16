import fs from 'fs'
import path from 'path'

const secretPatterns: RegExp[] = [
    /sk-\w{20,}/i,                   // OpenAI-like keys
    /eyJ[a-zA-Z0-9_-]{30,}\./,      // JWT-like
    /(?:api|access|auth|secret).*key.*=\w{20,}/i,  // general API keys
    /(?:token|password|secret).{0,10}=\w{12,}/i,
    /private_key/i
]

export function checkSecretsInCode(): { passed: string[]; failed: string[] } {
    const passed: string[] = []
    const failed: string[] = []

    const codeFiles = fs.readdirSync(process.cwd()).filter((f: string) =>
        f.endsWith('.js') || f.endsWith('.ts') || f.endsWith('.py') || f.endsWith('.rb') || f.endsWith('.php')
    )

    for (const file of codeFiles) {
        const content = fs.readFileSync(path.join(process.cwd(), file), 'utf-8')
        for (const pattern of secretPatterns) {
            const match = content.match(pattern)
            if (match) {
                failed.push(`Potential secret in ${file}: ${match[0].slice(0, 25)}...`)
            }
        }
    }

    if (failed.length === 0) {
        passed.push('No secrets found in codebase')
    }

    return { passed, failed }
}