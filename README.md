<div align="center">
  <a href="https://stackcheck-seven.vercel.app">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://github.com/davelart/stackcheck/blob/main/www/public/logo.png">
      <img alt="StackCheck logo" src="https://github.com/davelart/stackcheck/blob/main/www/public/logo.png" height="128">
    </picture>
  </a>
  <h1>StackCheck</h1>

[![Bundle Size](https://img.badgesize.io/https://unpkg.com/stackcheck/dist/bin/stackcheck.js?compression=gzip&style=for-the-badge&labelColor=0000FF)](https://npmjs.com/package/stackcheck)
[![Version](https://img.shields.io/npm/v/stackcheck?logo=npm&style=for-the-badge&labelColor=000000)](https://npmjs.com/package/stackcheck)
[![License](https://img.shields.io/npm/l/stackcheck?logo=npm&style=for-the-badge&labelColor=000000)](https://npmjs.com/package/stackcheck/LICENSE.md)
[![Downloads](https://img.shields.io/npm/dm/stackcheck?logo=npm&style=for-the-badge&labelColor=000000)](https://npmjs.com/package/stackcheck)
[![GitHub Repo stars](https://img.shields.io/github/stars/davelart/stackcheck?style=for-the-badge&logo=github&labelColor=000000)](https://github.com/davelart/stackcheck)
[![GitHub Forks](https://img.shields.io/github/forks/davelart/stackcheck?style=for-the-badge&logo=github&labelColor=000000)](https://github.com/davelart/stackcheck)

</div>

## Getting Started

StackCheck provides a simple way to verify everything your local dev environment needs before running a project.

From checking:

# Core Validation
- Node version
- Docker status
- ENV variables
- Open ports
- Secrets in .env
- Custom shell scripts

# Security Checks
- npm audit for vulnerabilities
- Secrets in code detection
- Sensitive port usage
- .gitignore configuration
- Environment variables git tracking

...to generating `.env.example` files and more.

Visit our [Site](https://stackcheck-seven.vercel.app) to learn more.

## Installation

### with npm
```sh filename="shell" copy
$ npm i stackcheck
```

### Usage
With npx (recommended for most)

```sh filename="shell" copy
npx stackcheck
```

You can also use the interactive setup:

```sh filename="shell" copy
npx stackcheck init
```

### Example .stackcheck.json

```json
{
  "node": ">=18.0.0 <20.0.0",
  "docker": true,
  "env": ["DATABASE_URL", "JWT_SECRET"],
  "ports": [3000, 5432],
  "custom": ["./scripts/check.sh"],
  "security": true  
}
```

## License

MIT © [David Lartey](https://github.com/davelart)