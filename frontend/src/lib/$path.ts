const buildSuffix = (url?: {query?: Record<string, string>, hash?: string}) => {
  const query = url?.query;
  const hash = url?.hash;
  if (!query && !hash) return '';
  const search = query ? `?${new URLSearchParams(query)}` : '';
  return `${search}${hash ? `#${hash}` : ''}`;
};

export const pagesPath = {
};

export type PagesPath = typeof pagesPath;

export const staticPath = {
  background_png: '/background.png',
  favicon_ico: '/favicon.ico',
  favicons: {
    android_chrome_192x192_png: '/favicons/android-chrome-192x192.png',
    android_chrome_512x512_png: '/favicons/android-chrome-512x512.png',
    apple_touch_icon_png: '/favicons/apple-touch-icon.png',
    favicon_16x16_png: '/favicons/favicon-16x16.png',
    favicon_32x32_png: '/favicons/favicon-32x32.png'
  },
  logo_svg: '/logo.svg',
  site_webmanifest: '/site.webmanifest'
} as const;

export type StaticPath = typeof staticPath;
