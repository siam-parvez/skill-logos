export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export function GET(request: Request) {
  const currentUrl = new URL(request.url);
  const targetUrl = new URL('/icons', request.url);
  targetUrl.search = currentUrl.search;
  return Response.redirect(targetUrl, 307);
}
