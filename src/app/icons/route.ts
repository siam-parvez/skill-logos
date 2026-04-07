import skillIcons from '@/lib/skill-icons';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const iconParam = (
    searchParams.get('i') ||
    searchParams.get('icons') ||
    'all'
  )
    .trim()
    .toLowerCase();

  const themeParam = searchParams.get('t') || searchParams.get('theme');
  let theme: 'dark' | 'light' | undefined;
  if (themeParam) {
    if (themeParam !== 'dark' && themeParam !== 'light') {
      return new Response('Theme must be either "light" or "dark"', {
        status: 400,
      });
    }
    theme = themeParam;
  }

  const perLineValue = searchParams.get('perline') || skillIcons.ICONS_PER_LINE;
  const perLine = Number(perLineValue);
  if (!Number.isFinite(perLine) || perLine < 1 || perLine > 50) {
    return new Response('Icons per line must be a number between 1 and 50', {
      status: 400,
    });
  }

  const requestedIconNames =
    iconParam === 'all'
      ? skillIcons.iconNameList
      : iconParam
          .split(',')
          .map((value) => value.trim().toLowerCase())
          .filter(Boolean);

  const iconShortNames =
    requestedIconNames.length > 0
      ? requestedIconNames
      : skillIcons.iconNameList;

  const iconNames = theme
    ? skillIcons.parseShortNames(iconShortNames, theme)
    : skillIcons.parseShortNames(iconShortNames);

  if (!iconNames) {
    return new Response("You didn't format the icons param correctly!", {
      status: 400,
    });
  }

  const svg = skillIcons.generateSvg(iconNames, perLine);

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml' },
  });
}
