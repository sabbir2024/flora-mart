
export const mainUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? process.env.NEXT_PUBLIC_VERCEL_URL.startsWith('http')
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
    : 'http://localhost:3000';

export const apiUrl = `${mainUrl}/api/v1`;