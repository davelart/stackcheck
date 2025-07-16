import { execSync } from "child_process"

export function checkNpmAudit(): { passed: string[]; failed: string[] } {
    const passed: string[] = []
    const failed: string[] = []

    try {
        const raw = execSync('npm audit --json', { encoding: 'utf-8' })
        const audit = JSON.parse(raw)
        const vulnerabilities = audit.metadata.vulnerabilities as Record<string, number>

        const total = Object.values(vulnerabilities).reduce((sum, v) => sum + v, 0)

        if (total === 0) {
            passed.push('No known vulnerabilities found')
        } else {
            for (const [severity, count] of Object.entries(vulnerabilities)) {
                if (count > 0) {
                    failed.push(`${count} ${severity} severity vulnerabilities`)
                }
            }
        }
    } catch (e) {
        failed.push('Failed to run npm audit - maybe not a Node project?')
    }

    return { passed, failed }
}
