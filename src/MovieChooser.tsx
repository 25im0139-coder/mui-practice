import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Button, Dialog } from '@mui/material';
import { movies } from './movies';
import './movie-chooser.css';

const PINK = '#ff2bd6';
const CYAN = '#16f4ff';
const n = movies.length;
const wrap = (i: number) => ((i % n) + n) % n;

// Shared neon button style for MUI <Button>
const neon = (c: string) => ({
  color: '#fff',
  border: `2px solid ${c}`,
  borderRadius: '999px',
  px: 2.5,
  py: 1,
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: `0 0 12px ${c}, inset 0 0 10px ${c}55`,
  '&:hover': { bgcolor: c, color: '#000', border: `2px solid ${c}` },
});

export default function MovieChooser() {
  const [cur, setCur] = useState(0);
  const [open, setOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [narrow, setNarrow] = useState(window.innerWidth < 640);
  const touchX = useRef<number | null>(null);

  const go = useCallback((i: number) => setCur(wrap(i)), []);

  // Screen size (for card spacing on phones)
  useEffect(() => {
    const onResize = () => setNarrow(window.innerWidth < 640);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Auto-slide every 5 seconds (pauses on hover and while details are open)
  useEffect(() => {
    if (open || paused) return undefined;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const t = setInterval(() => setCur((c) => wrap(c + 1)), 5000);
    return () => clearInterval(t);
  }, [open, paused, cur]);

  // Arrow keys
  useEffect(() => {
    if (open) return undefined;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setCur((c) => wrap(c - 1));
      if (e.key === 'ArrowRight') setCur((c) => wrap(c + 1));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const offset = (i: number) => {
    let d = wrap(i - cur);
    if (d > n / 2) d -= n;
    return d;
  };

  const surprise = () => {
    let r = cur;
    while (r === cur) r = Math.floor(Math.random() * n);
    go(r);
  };

  const m = movies[cur];
  const step = narrow ? 46 : 62;
  const vars = { '--c1': m.c1, '--c2': m.c2 } as CSSProperties;

  return (
    <div className="mc">
      <header>
        <h1>NEON CINEMA</h1>
        <p>Slide through the picks. Click a poster for details and the trailer.</p>
      </header>

      <div
        className="stage"
        aria-roledescription="carousel"
        aria-label="Movie picks"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          if (Math.abs(dx) > 40) go(cur + (dx < 0 ? 1 : -1));
          touchX.current = null;
        }}
      >
        <button className="nav prev" aria-label="Previous movie" onClick={() => go(cur - 1)}>‹</button>
        <button className="nav next" aria-label="Next movie" onClick={() => go(cur + 1)}>›</button>

        {movies.map((mv, i) => {
          const d = offset(i);
          const a = Math.abs(d);
          const style = {
            '--c1': mv.c1,
            '--c2': mv.c2,
            transform: `translate(-50%, -50%) translateX(${d * step}%) translateZ(${-a * 140}px) rotateY(${-d * 32}deg) scale(${a ? 0.86 : 1})`,
            zIndex: 10 - a,
            opacity: a > 2 ? 0 : a ? 0.65 : 1,
            pointerEvents: a > 2 ? 'none' : 'auto',
          } as CSSProperties;
          return (
            <button
              key={mv.title}
              type="button"
              className={'card' + (d === 0 ? ' active' : '')}
              style={style}
              tabIndex={d === 0 ? 0 : -1}
              aria-label={`${mv.title}, ${mv.year}`}
              onClick={() => (d === 0 ? setOpen(true) : go(i))}
            >
              <img src={mv.poster} alt={`Poster for ${mv.title}`} draggable={false} />
              <span className="hint">Click for details &amp; trailer</span>
            </button>
          );
        })}
      </div>

      <div className="info">
        <h2>{m.title}</h2>
        <span>{m.year} · {m.genres.join(' / ')} · {m.director}</span>
      </div>

      <div className="bar">
        <Button variant="outlined" sx={neon(PINK)} onClick={() => setOpen(true)}>View details</Button>
        <Button variant="outlined" sx={neon(CYAN)} onClick={surprise}>Surprise me</Button>
      </div>

      <div className="dots">
        {movies.map((mv, i) => (
          <button
            key={mv.title}
            className={'dot' + (i === cur ? ' on' : '')}
            aria-label={`Show ${mv.title}`}
            onClick={() => go(i)}
          />
        ))}
      </div>

      {/* Details + trailer */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
        sx={{
          '& .MuiDialog-paper': {
            background: 'transparent',
            backgroundImage: 'none',
            boxShadow: 'none',
            overflow: 'visible',
            m: 2,
          },
          '& .MuiBackdrop-root': { backgroundColor: 'rgba(4,2,10,.82)', backdropFilter: 'blur(6px)' },
        }}
      >
        <div className="sheet" style={vars}>
          <button className="x" aria-label="Close details" onClick={() => setOpen(false)}>✕</button>
          <div className="poster">
            <img src={m.poster} alt={`Poster for ${m.title}`} />
          </div>
          <div>
            <h3>{m.title}</h3>
            <p className="tag">{m.tagline}</p>
            <ul className="meta">
              {[m.year, `${m.minutes} min`, m.director, ...m.genres].map((x) => (
                <li key={String(x)}>{x}</li>
              ))}
            </ul>
            <p className="syn">{m.synopsis}</p>
            <div className="actions">
              <Button
                component="a"
                variant="outlined"
                sx={neon(PINK)}
                href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${m.title} ${m.year} official trailer`)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                ▶ Watch trailer
              </Button>
              <Button
                component="a"
                variant="outlined"
                sx={neon(CYAN)}
                href={`https://en.wikipedia.org/wiki/${m.wiki}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                More info
              </Button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
