import chalk from 'chalk'

export type ReportResult = {
  passed: string[];
  failed: string[];
};

export function printGroupedReport(title: string, results: ReportResult, silent = false) {
  if (!silent) {
    console.log(chalk.bold(`\n🧪 ${title}`));
    results.passed.forEach((msg) => console.log(`${chalk.green('✔')} ${msg}`));
    results.failed.forEach((msg) => console.log(`${chalk.red('✖')} ${msg}`));
    if (results.failed.length > 0) {
      console.log(chalk.yellow(`⚠️  ${results.failed.length} issue(s) found in ${title}`));
    } else {
      console.log(chalk.green(`✅ All checks passed for ${title}`));
    }
  }
}