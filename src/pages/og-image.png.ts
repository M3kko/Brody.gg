import { ImageResponse } from '@vercel/og';
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const title = url.searchParams.get('title') || 'Broderick';
  const description = url.searchParams.get('description') || '';

  // SVG noise filter as a data URI for the grain texture
  const noiseSvg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/><feColorMatrix type='saturate' values='0'/></filter><rect width='300' height='300' filter='url(%23n)' opacity='0.18'/></svg>`;
  const noiseDataUri = `data:image/svg+xml,${encodeURIComponent(noiseSvg)}`;

  // Triangle SVG as data URI
  const triangleSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 87'><polygon points='50,0 100,87 0,87' fill='rgba(255,30,30,0.09)'/></svg>`;
  const triangleDataUri = `data:image/svg+xml,${encodeURIComponent(triangleSvg)}`;

  const triangle2Svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 87'><polygon points='50,0 100,87 0,87' fill='rgba(180,20,60,0.06)'/></svg>`;
  const triangle2DataUri = `data:image/svg+xml,${encodeURIComponent(triangle2Svg)}`;

  // Small red triangle for branding
  const brandTriSvg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 87'><polygon points='50,0 100,87 0,87' fill='%23FF0000'/></svg>`;
  const brandTriDataUri = `data:image/svg+xml,${encodeURIComponent(brandTriSvg)}`;

  return new ImageResponse(
    {
      type: 'div',
      props: {
        style: {
          height: '100%',
          width: '100%',
          display: 'flex',
          position: 'relative',
          backgroundColor: '#0a0a0a',
          overflow: 'hidden',
        },
        children: [
          // Primary gradient orb (upper right)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '-180px',
                right: '-120px',
                width: '800px',
                height: '800px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,20,20,0.45) 0%, rgba(255,20,20,0.1) 50%, transparent 70%)',
              },
            },
          },
          // Secondary gradient orb (lower left)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '-200px',
                left: '-150px',
                width: '700px',
                height: '700px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(160,20,60,0.35) 0%, rgba(160,20,60,0.06) 50%, transparent 70%)',
              },
            },
          },
          // Tertiary glow (center)
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: '100px',
                left: '350px',
                width: '500px',
                height: '500px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(255,80,50,0.1) 0%, transparent 70%)',
              },
            },
          },
          // Large decorative triangle
          {
            type: 'img',
            props: {
              src: triangleDataUri,
              width: 520,
              height: 450,
              style: {
                position: 'absolute',
                top: '-40px',
                left: '300px',
              },
            },
          },
          // Smaller decorative triangle
          {
            type: 'img',
            props: {
              src: triangle2DataUri,
              width: 260,
              height: 226,
              style: {
                position: 'absolute',
                top: '30px',
                right: '80px',
              },
            },
          },
          // Vignette overlay
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                inset: '0',
                background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.4) 100%)',
              },
            },
          },
          // Noise/grain overlay
          {
            type: 'img',
            props: {
              src: noiseDataUri,
              width: 1200,
              height: 630,
              style: {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '1200px',
                height: '630px',
                objectFit: 'cover',
              },
            },
          },
          // Content layer
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                bottom: '0',
                left: '0',
                right: '0',
                padding: '70px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
              },
              children: [
                // Title
                {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: title.length > 40 ? '48px' : '58px',
                      fontWeight: '700',
                      color: '#ffffff',
                      lineHeight: '1.2',
                      marginBottom: description ? '16px' : '30px',
                    },
                    children: title,
                  },
                },
                // Description
                description ? {
                  type: 'div',
                  props: {
                    style: {
                      fontSize: '26px',
                      color: 'rgba(255,255,255,0.45)',
                      lineHeight: '1.4',
                      marginBottom: '30px',
                    },
                    children: description,
                  },
                } : null,
                // Divider
                {
                  type: 'div',
                  props: {
                    style: {
                      width: '140px',
                      height: '1px',
                      backgroundColor: 'rgba(255,255,255,0.12)',
                      marginBottom: '24px',
                    },
                  },
                },
                // Branding row
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                    },
                    children: [
                      {
                        type: 'img',
                        props: {
                          src: brandTriDataUri,
                          width: 18,
                          height: 16,
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontSize: '22px',
                            fontWeight: '500',
                            color: 'rgba(255,255,255,0.55)',
                          },
                          children: 'brody.gg',
                        },
                      },
                    ],
                  },
                },
              ].filter(Boolean),
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
};
