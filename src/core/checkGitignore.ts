import fs from 'fs'

export function checkGitignore(): { passed: string[]; failed: string[] } {
    const passed: string[] = []
    const failed: string[] = []

    if (!fs.existsSync('.gitignore')) {
        failed.push('No .gitignore file found!')
        return { passed, failed }
    }

    const contents = fs.readFileSync('.gitignore', 'utf-8')
    const lines = contents.split('\n').map(line => line.trim())
    const required = ['.env', 'node_modules']
    const missing = required.filter(entry => !lines.includes(entry))

    if (missing.length > 0) {
        missing.forEach(entry => failed.push(`.gitignore is missing ${entry}`))
    } else {
        passed.push('.gitignore includes .env and node_modules')
    }

    return { passed, failed }
}