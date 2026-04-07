import skillIcons from '@/lib/skill-icons';

export const runtime = 'nodejs';
export const revalidate = 3600;

export function GET() {
  return Response.json(skillIcons.icons, {
    headers: {
      'Cache-Control':
        'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
