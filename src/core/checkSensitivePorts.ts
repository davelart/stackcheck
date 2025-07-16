export function checkSensitivePorts(openPorts: number[]): { passed: string[]; failed: string[] } {
    const passed: string[] = []
    const failed: string[] = []

    const riskyPorts = [22, 80, 3306, 6379, 5000] // SSH, HTTP, MySQL, Redis, etc.
    
    for (const port of openPorts) {
      if (riskyPorts.includes(port)) {
        failed.push(`⚠️ Port ${port} is sensitive — consider firewalling`)
      } else {
        passed.push(`Port ${port} is okay`)
      }
    }
    
    return { passed, failed }
}