import { execa } from 'execa'

export async function checkDockerRunning(fix = false): Promise<{ passed: string[], failed: string[] }> {
  try {
    await execa('docker', ['info']);
    return { passed: ['Docker is running'], failed: [] };
  } catch {
    const failed = ['Docker is not running or not installed'];
    if (fix) {
      failed.push(`🔧 Install Docker: https://www.docker.com/products/docker-desktop`);
    }
    return { passed: [], failed };
  }
}