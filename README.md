# Skill Logos

Live site: [skill-logos.vercel.app](https://skill-logos.vercel.app/)

Skill Logos is an open-source alternative inspired by [skillicons.dev](https://skillicons.dev/). It exists because I wanted a logo set that felt more current and covered more of the tools, frameworks, and brands people actually use today.

The project is actively evolving. More logos will be added over time, and community contributions are welcome.

## What It Does

- Lets you build a clean skill wall for GitHub profiles, READMEs, and project docs.
- Generates SVG output from a simple URL.
- Supports dark and light themes.
- Provides ready-to-copy Markdown and HTML embed snippets.

## Usage

Open the site, search for the logos you want, select them, and copy the embed code.

The main SVG endpoint accepts these query parameters:

- `i` or `icons`: comma-separated icon names, or `all` for the full set.
- `theme` or `t`: `dark` or `light`.
- `perline`: number of icons per row.

Example:

```text
https://skill-logos.vercel.app/icons?i=react,nextjs,typescript&theme=dark&perline=8
```

Helpful API routes:

- `/api/icons/list` returns the available icon names.
- `/api/icons/raw` returns the full icon map.

## Why This Project Exists

- The original icon set I used was missing some logos.
- Some logos were outdated or no longer matched current branding.
- I wanted an open project that could grow with the community.

## Contributing

Issues and pull requests are encouraged.

Please open an issue if you spot a missing logo, an incorrect mapping, or an outdated asset. If you want to add logos or improve the API, a PR is even better.

## Roadmap

- Add more logos.
- Improve coverage for missing and outdated brands.
- Keep expanding the catalog based on community requests.

## Credits

- Inspired by [skillicons.dev](https://skillicons.dev/)
- Built with Next.js, React, and Tailwind CSS
