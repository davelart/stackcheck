#!/usr/bin/env node

import { program } from 'commander'
import chalk from 'chalk'
import dotenv from 'dotenv'
import * as fs from 'fs'
import * as path from 'path'
import prompts from 'prompts'

import { loadConfig } from '../core/configLoader'
import { checkNodeVersion } from '../core/checkNode'
import { checkDockerRunning } from '../core/checkDocker'
import { checkEnvVars } from '../core/checkEnvVars'
import { checkPorts } from '../core/checkPorts'
import { checkCustom } from '../core/checkCustom'
import { generateEnvExample } from '../core/generateEnvExample'
import { checkEnvSecrets } from '../core/checkEnvSecrets'
import { printGroupedReport } from '../utils/report'
import { ReportResult } from '../utils/report'
import { sendTelemetry } from '../utils/telemetry'

dotenv.config()

program
  .name('stackcheck')
  .version('1.0.0')
  .description('Validate your local dev environment with ease')

// Initialize command
program
  .command('init')
  .description('Initialize a new stackcheck config file')
  .action(async () => {
    const response = await prompts([
      {
        type: 'text',
        name: 'node',
        message: 'Expected Node.js version (e.g. >=18)',
      },
      {
        type: 'confirm',
        name: 'docker',
        message: 'Check if Docker is running?',
        initial: true
      },
      {
        type: 'list',
        name: 'env',
        message: 'List required ENV vars (comma-separated)',
        separator: ','
      },
      {
        type: 'list',
        name: 'ports',
        message: 'List ports to check (comma-separated)',
        separator: ',',
        format: (vals: string[]) => vals.map(Number)
      },
      {
        type: 'list',
        name: 'custom',
        message: 'Custom shell commands (comma-separated)',
        separator: ','
      }
    ])
    
    const config = {
      node: response.node,
      docker: response.docker,
      env: response.env,
      ports: response.ports,
      custom: response.custom
    }
    
    fs.writeFileSync('.stackcheck.json', JSON.stringify(config, null, 2))
    console.log(chalk.green('✅ .stackcheck.json created successfully.'))
    process.exit(0)
  })

// Main command
program
  .option('--fix', 'Suggest fixes for failed checks')
  .option('--gen-env', 'Generate a .env.example file from required ENV vars')
  .option('--silent', 'Suppress success messages')
  .option('--env <env>', 'Use a specific environment config file')
  .option('--report <file>', 'Save results to a file (e.g. report.json)')
  .option('--telemetry', 'Allow anonymous telemetry (e.g., usage stats)')
  .action(async (options) => {
    const config = loadConfig(options.env)
    const shouldFix = options.fix
    const shouldGenEnv = options.genEnv
    const shouldSilent = options.silent
    const shouldReport = options.report
    const shouldTelemetry = options.telemetry

    const results: Record<string, ReportResult> = {}

    console.log(chalk.bold('\n🔍 StackCheck Results'))
    if (!shouldSilent) {
      console.log('='.repeat(40))
    }

    // Node.js
    const nodeResults = await checkNodeVersion(config.node, shouldFix)
    results['Node.js'] = nodeResults
    if (!shouldSilent) {
      printGroupedReport('Node.js', nodeResults)
    }

    // Docker
    if (config.docker) {
      const dockerPassed = await checkDockerRunning(shouldFix)
      results['Docker'] = dockerPassed
      if (!shouldSilent) {
        printGroupedReport('Docker', dockerPassed)
      }
    }

    // ENV Vars
    if (config.env) {
      const envResults = await checkEnvVars(config.env)
      results['ENV Vars'] = envResults
      if (!shouldSilent) {
        printGroupedReport('ENV Vars', envResults)
      }
    }

    // ENV Secrets
    if (config.env) {
      const secretsResults = await checkEnvSecrets()
      results['Secret Detection (.env)'] = secretsResults
      if (!shouldSilent) {
        printGroupedReport('Secret Detection (.env)', secretsResults)
      }
    }

    // Ports
    if (config.ports) {
      const portResults = await checkPorts(config.ports)
      results['Ports'] = portResults
      if (!shouldSilent) {
        printGroupedReport('Ports', portResults)
      }
    }

    // Custom
    if (config.custom && config.custom.length > 0) {
      const customResults = await checkCustom(config.custom)
      results['Custom Shell Checks'] = customResults
      if (!shouldSilent) {
        printGroupedReport('Custom Shell Checks', customResults)
      }
    }

    // Generate .env.example
    if (shouldGenEnv && config.env) {
      results['Generate .env.example'] = {
        passed: [],
        failed: [],
      }
      if (!shouldSilent) {
        generateEnvExample(config.env)
      }
    }

    // Report
    if (shouldReport) {
      const reportPath = path.resolve(process.cwd(), shouldReport)
      fs.writeFileSync(reportPath, JSON.stringify(results, null, 2))
      console.log(chalk.blue(`\n📝 Report saved to ${shouldReport}`))
    }

    // Telemetry
    if (shouldTelemetry) {
      await sendTelemetry('run', {
        env: options.env || 'default',
        report: !!shouldReport,
        checksRun: Object.keys(results),
      });
    }

    console.log('\n')
    if (!shouldSilent) {
      console.log('='.repeat(40))
    }

    // Check for failures
    const hasFailures = Object.values(results).some(group => group.failed.length > 0)

    if (hasFailures) {
      console.log(chalk.red('\n❌ One or more checks failed.'))
      process.exit(1)
    } else {
      console.log(chalk.green('\n✅ All checks passed.'))
    }

  })

program.parse(process.argv)