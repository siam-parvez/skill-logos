import fs from 'fs';
import path from 'path';

const iconsDir = path.join(process.cwd(), 'public', 'icons');

const shortNames: Record<string, string> = {
  js: 'javascript',
  ts: 'typescript',
  py: 'python',
  tailwind: 'tailwindcss',
  vue: 'vuejs',
  nuxt: 'nuxtjs',
  go: 'golang',
  cf: 'cloudflare',
  wasm: 'webassembly',
  postgres: 'postgresql',
  k8s: 'kubernetes',
  next: 'nextjs',
  mongo: 'mongodb',
  md: 'markdown',
  ps: 'photoshop',
  ai: 'illustrator',
  pr: 'premiere',
  ae: 'aftereffects',
  scss: 'sass',
  sc: 'scala',
  net: 'dotnet',
  gatsbyjs: 'gatsby',
  gql: 'graphql',
  vlang: 'v',
  amazonwebservices: 'aws',
  bots: 'discordbots',
  express: 'expressjs',
  googlecloud: 'gcp',
  mui: 'materialui',
  windi: 'windicss',
  unreal: 'unrealengine',
  nest: 'nestjs',
  ktorio: 'ktor',
  pwsh: 'powershell',
  au: 'audition',
  rollup: 'rollupjs',
  rxjs: 'reactivex',
  rxjava: 'reactivex',
  ghactions: 'githubactions',
  sklearn: 'scikitlearn',
};

const icons: Record<string, string> = {};
for (const iconFile of fs.readdirSync(iconsDir)) {
  const name = path.parse(iconFile).name.toLowerCase();
  icons[name] = String(fs.readFileSync(path.join(iconsDir, iconFile)));
}

const iconNameList = [
  ...new Set(Object.keys(icons).map((name) => name.split('-')[0])),
];
const iconNameSet = new Set(iconNameList);
const themedIconSet = new Set(
  Object.keys(icons)
    .filter((name) => name.endsWith('-light') || name.endsWith('-dark'))
    .map((name) => name.split('-')[0]),
);

export const ICONS_PER_LINE = 15;
const ONE_ICON = 48;
const SCALE = ONE_ICON / (300 - 44);

function resolveIconName(name: string, theme: 'dark' | 'light' = 'dark') {
  if (iconNameSet.has(name)) {
    return themedIconSet.has(name) ? `${name}-${theme}` : name;
  }

  const mappedName = shortNames[name];
  if (!mappedName || !iconNameSet.has(mappedName)) {
    return null;
  }

  return themedIconSet.has(mappedName) ? `${mappedName}-${theme}` : mappedName;
}

function parseShortNames(names: string[], theme: 'dark' | 'light' = 'dark') {
  const resolvedNames: string[] = [];

  for (const name of names) {
    const resolvedName = resolveIconName(name, theme);
    if (!resolvedName) {
      return null;
    }

    resolvedNames.push(resolvedName);
  }

  return resolvedNames;
}

function generateSvg(iconNames: string[], perLine: number) {
  const iconSvgList = iconNames.map((name) => icons[name]);
  const length = Math.min(perLine * 300, iconNames.length * 300) - 44;
  const height = Math.ceil(iconSvgList.length / perLine) * 300 - 44;
  const scaledHeight = height * SCALE;
  const scaledWidth = length * SCALE;

  return `
  <svg width="${scaledWidth}" height="${scaledHeight}" viewBox="0 0 ${length} ${height}" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1">
    ${iconSvgList
      .map(
        (svg, index) => `
        <g transform="translate(${(index % perLine) * 300}, ${
          Math.floor(index / perLine) * 300
        })">
          ${svg}
        </g>
        `,
      )
      .join(' ')}
  </svg>
  `;
}

const skillIcons = {
  ICONS_PER_LINE,
  generateSvg,
  iconNameList,
  icons,
  parseShortNames,
};

export default skillIcons;
