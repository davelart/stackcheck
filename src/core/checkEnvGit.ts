import { execSync } from 'child_process'
import fs from 'fs'

export function checkEnvGit(): { passed: string[]; failed: string[] } {
    const passed: string[] = []
    const failed: string[] = []

    if (!fs.existsSync('.env')) {
        passed.push('.env file not found - skipping Git check')
        return { passed, failed }
    }

    try {
        const output = execSync('git ls-files .env', { encoding: 'utf-8' }).trim()
        if (output) {
            failed.push('.env is tracked by Git - remove or ignore it!')
        } else {
            passed.push('.env is not tracked in Git - good!')
        }
    } catch (error) {
        failed.push('Unable to check .env Git tracking - is this a Git repo?')
    }
    
    return { passed, failed }
}