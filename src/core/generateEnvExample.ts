import * as fs from 'fs'
import * as path from 'path'
import chalk from 'chalk'

export function generateEnvExample(envVars: string[]): void {
  const targetPath = path.resolve(process.cwd(), '.env.example')

  const contents = envVars.map((key) => `${key}=`).join('\n') + '\n'

  try {
    fs.writeFileSync(targetPath, contents, { flag: 'w' })
    console.log(chalk.green(`✔ .env.example generated with ${envVars.length} keys`))
  } catch (err) {
    console.error(chalk.red(`✖ Failed to write .env.example`))
    console.error(err)
  }
}