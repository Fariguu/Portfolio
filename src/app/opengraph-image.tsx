import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Gabriele Farigu | Sviluppatore Web & Software';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 80px',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Glow decoration */}
        <div
          style={{
            position: 'absolute',
            top: '-20%',
            left: '30%',
            width: '500px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(144, 137, 252, 0.25) 0%, rgba(255, 128, 181, 0.15) 50%, transparent 70%)',
            filter: 'blur(60px)',
            borderRadius: '50%',
          }}
        />

        {/* Badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 24px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            marginBottom: '28px',
            color: '#a1a1aa',
            fontSize: 22,
            fontWeight: 500,
            letterSpacing: '0.05em',
          }}
        >
          <div
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: '#22c55e',
              marginRight: '12px',
            }}
          />
          PORTFOLIO & PROGETTI
        </div>

        {/* Name Heading */}
        <div
          style={{
            fontSize: 68,
            fontWeight: 800,
            background: 'linear-gradient(to right, #ffffff, #e4e4e7, #a1a1aa)',
            backgroundClip: 'text',
            color: 'transparent',
            letterSpacing: '-0.02em',
            textAlign: 'center',
            marginBottom: '16px',
          }}
        >
          Gabriele Farigu
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 32,
            fontWeight: 500,
            color: '#d4d4d8',
            textAlign: 'center',
            marginBottom: '44px',
          }}
        >
          Sviluppatore Web & Software
        </div>

        {/* Tech Stack Pills */}
        <div
          style={{
            display: 'flex',
            gap: '14px',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          {['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'].map((tech) => (
            <div
              key={tech}
              style={{
                padding: '8px 20px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                borderRadius: '12px',
                color: '#f4f4f5',
                fontSize: 20,
                fontWeight: 600,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
