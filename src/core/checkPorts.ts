import isPortReachable from 'is-port-reachable'

export async function checkPorts(ports: number[]): Promise<{ passed: string[], failed: string[] }> {
  const passed: string[] = []
  const failed: string[] = []

  for (const port of ports) {
    const inUse = await isPortReachable(port, { host: 'localhost' })

    if (!inUse) {
      passed.push(`Port ${port} is available`)
    } else {
      failed.push(`Port ${port} is already in use`)
    }
  }

  return { passed, failed }
}