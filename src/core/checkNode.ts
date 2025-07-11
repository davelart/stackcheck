import { execa } from 'execa'
import semver from 'semver'
import chalk from 'chalk'

export async function checkNodeVersion(expected: string = '', fix = false): Promise<{ passed: string[], failed: string[] }> {
  const passed: string[] = [];
  const failed: string[] = [];

  try {
    const { stdout } = await execa('node', ['-v']);
    const version = stdout.replace(/^v/, '');

    if (semver.satisfies(version, expected)) {
      passed.push(`Node.js version ${version} satisfies expected ${expected}`);
    } else {
      failed.push(`Node.js version ${version} does NOT satisfy expected ${expected}`);
      if (fix) {
        failed.push(`🔧 Run: ${chalk.blue('nvm install ' + expected)}`);
      }
    }
  } catch {
    failed.push(`Node.js is not installed`);
    if (fix) {
      failed.push(`🔧 Install Node.js: https://nodejs.org`);
    }
  }

  return { passed, failed };
}