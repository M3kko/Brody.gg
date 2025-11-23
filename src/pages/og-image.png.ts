import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get('title') || 'Broderick';
  const description = url.searchParams.get('description') || '';

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          backgroundColor: '#F5F1E8',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                fontSize: '72px',
                fontWeight: '600',
                color: '#1a1a1a',
                marginBottom: '20px',
                lineHeight: '1.2',
              },
              children: title,
            },
          },
          description && {
            type: 'div',
            props: {
              style: {
                fontSize: '36px',
                color: '#666',
                lineHeight: '1.4',
              },
              children: description,
            },
          },
        ].filter(Boolean),
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
};
