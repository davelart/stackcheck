export async function checkEnvVars(requiredVars: string[]): Promise<{ passed: string[], failed: string[] }> {
    const passed: string[] = []
    const failed: string[] = []
  
    for (const key of requiredVars) {
      if (process.env[key]) {
        passed.push(`ENV var "${key}" is set`)
      } else {
        failed.push(`ENV var "${key}" is MISSING`)
      }
    }
  
    return { passed, failed }
}