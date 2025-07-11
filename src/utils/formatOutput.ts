import chalk from "chalk"

export function success(msg: string) {
    console.log(`${chalk.green('✔')} ${msg}`)
}

export function fail(msg: string) {
    console.log(`${chalk.red('✖')} ${msg}`)
}
  