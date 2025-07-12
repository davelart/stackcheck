# StackCheck

> Validate your local development environment from a single config file.

![CI](https://github.com/davelart/stackcheck/actions/workflows/ci.yml/badge.svg)
![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)
![Downloads](https://img.shields.io/npm/dm/stackcheck)
![Version](https://img.shields.io/npm/v/stackcheck)

---

## Getting Started

StackCheck provides a simple way to verify everything your local dev environment needs before running a project.

From checking:
- Node version
- Docker status
- ENV variables
- Open ports
- Secrets in .env
- Custom shell scripts

...to generating `.env.example` files and more.

Check out the [StackCheck Site](https://stackcheck-seven.vercel.app) to learn more.

---

## Documentation

View the full documentation at  
👉 **[https://stackcheck-seven.vercel.app/docs](https://stackcheck-seven.vercel.app/docs)**

---

## Contributing

Contributions to StackCheck are welcome and highly appreciated. However, before you jump right into it, we would like you to review our [Contribution Guidelines](https://github.com/davelart/stackcheck/blob/main/CONTRIBUTING.md) to make sure you have a smooth experience contributing to StackCheck.

---

## Installation

### Using Yarn

```bash
yarn global add stackcheck
```

### Using NPM

```bash
npm install -g stackcheck
```

### Using pnpm

```bash
pnpm install -g stackcheck
```

### Usage
With npx (recommended for most)

```bash
npx stackcheck
```

### You can also use the interactive setup:

```bash
npx stackcheck init
```

### Example .stackcheck.json
```json
{
  "node": ">=18.0.0 <20.0.0",
  "docker": true,
  "env": ["DATABASE_URL", "JWT_SECRET"],
  "ports": [3000, 5432],
  "custom": ["./scripts/check.sh"]
}
```

---

## Support StackCheck

To support this project, consider contributing or sharing with your developer network.

---

## License
MIT © [David Lartey](https://github.com/davelart)