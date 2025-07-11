import { execa } from 'execa'

export async function checkCustom(commands: string[]): Promise<{ passed: string[]; failed: string[] }> {
  const passed: string[] = []
  const failed: string[] = []

  for (const command of commands) {
    try {
      await execa(command, { stdio: 'ignore', shell: true })
      passed.push(`Custom check passed: "${command}"`)
    } catch (err) {
      failed.push(`Custom check FAILED: "${command}"`)
    }
  }

  return { passed, failed }
}