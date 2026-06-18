# Contributing to koztechie

This project is an 11ty-based multilingual personal portfolio and business card site. It supports 4 languages (en, uk, es, de) and is built using Node 20, 11ty 3.1.5, Nunjucks, and Netlify.

## Development Setup

### Prerequisites
- **Node.js 20+** (configured via `.node-version` / `.nvmrc`)

### Installation
```bash
npm ci --include=dev
```

### Local Development
```bash
npm start
```
This starts the development server at [http://localhost:8080](http://localhost:8080) with live reloading.

### Production Build
```bash
npm run build:prod
```
Builds the production-ready static site into the `_site/` directory.

---

## Conventional Commits

We follow the [Conventional Commits 1.0.0](https://www.conventionalcommits.org/) specification for commit messages. 

### Supported Types
- `feat` — A new feature
- `fix` — A bug fix
- `docs` — Documentation-only changes
- `style` — Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- `refactor` — A code change that neither fixes a bug nor adds a feature
- `perf` — A code change that improves performance
- `test` — Adding missing tests or correcting existing tests
- `build` — Changes that affect the build system or external dependencies
- `ci` — Changes to our CI configuration files and scripts
- `chore` — Other changes that don't modify src or test files
- `revert` — Reverts a previous commit

### Commit Message Format
```
<type>(<scope>): <subject>

[body]

[footer(s)]
```

### Project-Specific Examples
- `feat(i18n): add German translation for credentials section`
- `fix(css): correct glow-strip opacity on mobile breakpoint`
- `docs(readme): update Netlify deployment instructions`
- `style(tokens): rename --color-cold-500 to --color-teal-500`
- `refactor(layout): simplify base.njk component includes`
- `perf(js): reduce glitch animation CPU usage`
- `build(deps): bump @11ty/eleventy to 3.2.0`
- `ci(netlify): add branch preview deploy config`

### Scopes
The scopes relevant to this project are: `css`, `js`, `i18n`, `seo`, `a11y`, `config`, `deps`, `layout`, `readme`.

### Breaking Changes
Mark breaking changes with an `!` after the type/scope, or include a `BREAKING CHANGE:` footer.

---

## Pull Request Process

1. Fork the repository.
2. Create your feature branch (`git checkout -b feat/description`).
3. Ensure that the production build passes without errors:
   ```bash
   npm run build:prod
   ```
4. Commit your changes using Conventional Commits.
5. Push to the branch and open a Pull Request against `main`.

---

## Internationalization (i18n) Guidelines

- **No Hardcoded Strings:** ALL user-facing text lives in [translations.json](file:///home/koztechie/dev/koztechie/src/_data/translations.json). Never hardcode string literals inside `.njk` templates; always use `{{ t.key }}`.
- **Multilingual Support:** Any text addition or modification MUST be reflected across all 4 supported languages: `en`, `uk`, `es`, `de`.
- **Adding a Language:** When introducing a new language:
  1. Add translations to `src/_data/translations.json`.
  2. Create a folder `src/<lang>/index.njk`.
  3. Update [lang-switcher.njk](file:///home/koztechie/dev/koztechie/src/_includes/components/lang-switcher.njk) and the redirect logic in [index.njk](file:///home/koztechie/dev/koztechie/src/index.njk) as needed.

---

## Accessibility (a11y) Requirements

- **Reduced Motion:** Respect the `prefers-reduced-motion` media feature for all custom animations and transitions.
- **Semantic Structure:** Keep the markup accessible and semantically structured (e.g. `article`, `nav`, `main`, `footer`).
- **Focus Indicators:** Ensure skip-link functionality is intact and custom `:focus-visible` styles remain usable.
- **Keyboard Navigation:** Always verify keyboard focus flows correctly after changes to layouts or elements.

---

## Code Style

- **CSS:** Always reference properties defined in [tokens.css](file:///home/koztechie/dev/koztechie/src/assets/css/tokens.css). Avoid "magic numbers" and hardcoded values where design tokens should be applied.
- **JS:** Keep scripts clean and standard: use IIFE patterns, declare `'use strict'`, and avoid unnecessary external library dependencies.
- **Nunjucks:** Use the `t.` prefix for outputting translation keys and place all page component layout elements in `src/_includes/components/`.

---

## Questions?

If you have any questions or need clarification, please open an issue or contact Eugene via Telegram: https://t.me/koztechie
