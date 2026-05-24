import { useState, useEffect, useRef } from 'react'
import './index.css'

const NAV_ITEMS = ['About', 'Skills', 'Projects', 'Experience', 'Contact']

const SKILLS = {
  Backend: ['PHP/Laravel', 'Node.js/Express', 'C#/ASP.NET Core', 'Java', 'Python'],
  Databases: ['MySQL', 'PostgreSQL', 'Redis', 'Supabase'],
  'API & Auth': ['REST API', 'WebSocket/Socket.IO', 'JWT/OAuth', 'GraphQL', 'Postman'],
  Frontend: ['React.js', 'TypeScript', 'JavaScript ES6+', 'HTML5/CSS3','Zustand','Pixi.js', 'Tailwind CSS'],
  'DevOps': ['Linux/AWS EC2', 'Git', 'Docker', 'PM2','nginx','Apache'],
  'AI Tools': ['Claude', 'Gemini', 'ChatGPT', 'Cursor'],
}

const PROJECTS = [
  {
    id: '01',
    title: 'Streaming Platform',
    subtitle: 'Telecomm1 Production Backend',
    year: '2025',
    status: 'Live',
    description: 'Production-grade streaming backend with real-time WebSocket delivery, geo-restriction engine, traffic limits, and Redis pub/sub architecture. Built full authentication for SPA and TV APK clients using Laravel Sanctum.',
    stack: ['Laravel', 'Node.js', 'Redis', 'MySQL', 'WebSocket', 'JWT', 'Linux'],
    color: 'amber',
    highlight: 'High-load production system with Redis caching layers and service separation',
    role: 'Full-Stack',
  },
  {
    id: '02',
    title: 'Driftless',
    subtitle: 'ASP.NET API Documentation Tool',
    year: '2025',
    status: 'Public',
    link: 'driftless.nikatopu.dev',
    description: 'Scans entire Git repositories, analyzes ASP.NET backend code and auto-generates full API route documentation. React frontend consumes generated types directly — eliminating frontend-backend integration friction.',
    stack: ['React', 'ASP.NET', 'TypeScript', 'Git API', 'REST API'],
    color: 'teal',
    highlight: 'Actively used by developers to accelerate frontend-backend integration',
    role: 'Full-Stack',
  },
  {
    id: '03',
    title: 'Flashcard Learner',
    subtitle: 'AI-Powered Spaced Repetition API',
    year: '2024',
    status: 'Personal',
    description: 'REST API with spaced-repetition algorithm and TensorFlow.js AI hint generation. Includes a companion browser extension that generates flashcards from any webpage with a single click.',
    stack: ['Node.js', 'PostgreSQL', 'Supabase', 'TensorFlow.js', 'JWT', 'REST API'],
    color: 'amber',
    highlight: 'Browser extension + AI hint generation with TensorFlow.js',
    role: 'Full-Stack',
  },
  {
    id: '04',
    title: 'Robot Simulation Server',
    subtitle: 'Real-time Client-Server Simulation',
    year: '2023',
    status: 'Personal',
    description: 'RESTful API and WebSocket server for robot client-server simulation. Deployed on AWS EC2 with PM2 for production-level process management and service uptime.',
    stack: ['Node.js', 'Socket.IO', 'AWS EC2', 'PM2', 'Linux', 'REST API'],
    color: 'teal',
    highlight: 'AWS EC2 production deployment with PM2 process management',
    role: 'Full-Stack',
  },
  {
    id: '05',
    title: 'FlowCheck',
    subtitle: 'GitHub Repository Monitor',
    year: '2025',
    status: 'Personal',
    description: 'Real-time GitHub branch health monitoring via GraphQL API. Socket.IO service streams build push notifications instantly. Deployed on Render with live dashboard.',
    stack: ['Node.js', 'GraphQL', 'Socket.IO', 'REST API', 'Render'],
    color: 'amber',
    highlight: 'GraphQL + Socket.IO real-time pipeline monitoring',
    role: 'Full-Stack',
  },
]

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect() } }, { threshold })
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-3' : 'py-6'}`}
      style={{ background: scrolled ? 'rgba(8,10,14,0.95)' : 'transparent', backdropFilter: scrolled ? 'blur(20px)' : 'none', borderBottom: scrolled ? '1px solid rgba(30,45,61,0.8)' : 'none' }}>
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-8 h-8 border border-amber-400/60 flex items-center justify-center" style={{ borderColor: 'var(--color-amber)' }}>
            <span className="text-xs font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}>TD</span>
          </div>
          <span className="text-sm tracking-widest uppercase" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>Toma Danelia</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map(item => (
            <a key={item} href={`#${item.toLowerCase()}`}
              className="text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-100"
              style={{ fontFamily: 'var(--font-mono)', color: active === item ? 'var(--color-amber)' : 'var(--color-muted)' }}
              onMouseEnter={() => setActive(item)} onMouseLeave={() => setActive('')}>
              {item}
            </a>
          ))}
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  const [typed, setTyped] = useState('')
  const phrase = 'Backend Developer'
  useEffect(() => {
    let i = 0
    const t = setInterval(() => {
      if (i <= phrase.length) { setTyped(phrase.slice(0, i)); i++ }
      else clearInterval(t)
    }, 80)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center grid-bg noise-bg" id="about">
      {/* Decorative corner marks */}
      <div className="absolute top-8 left-8 w-8 h-8 border-l-2 border-t-2" style={{ borderColor: 'var(--color-amber)' }} />
      <div className="absolute top-8 right-8 w-8 h-8 border-r-2 border-t-2" style={{ borderColor: 'var(--color-amber)' }} />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-l-2 border-b-2" style={{ borderColor: 'var(--color-muted)' }} />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-r-2 border-b-2" style={{ borderColor: 'var(--color-muted)' }} />

      {/* Ambient light blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,212,170,0.05) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-7xl mx-auto px-8 w-full pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="animate-fade-in opacity-0 mb-6 flex items-center gap-3">
              <div className="h-px w-12" style={{ background: 'var(--color-amber)' }} />
              <span className="section-label">Available for opportunities</span>
            </div>

            <h1 className="animate-fade-in-up opacity-0 delay-200 mb-4 leading-none"
              style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 800, color: 'var(--color-bright)' }}>
              Toma<br />
              <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontFamily: 'var(--font-serif)', fontSize: '0.9em' }}>Danelia</span>
            </h1>

            <div className="animate-fade-in-up opacity-0 delay-300 mb-8 h-10 flex items-center">
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', color: 'var(--color-teal)' }}>
                {typed}
                <span className="animate-blink" style={{ color: 'var(--color-amber)' }}>_</span>
              </span>
            </div>

            <p className="animate-fade-in-up opacity-0 delay-400 mb-10 max-w-lg leading-relaxed"
              style={{ color: 'var(--color-text)', fontSize: '1.05rem', lineHeight: 1.8 }}>
              I build <span style={{ color: 'var(--color-bright)', fontWeight: 600 }}>production-grade backends</span> and clean frontends — high-load REST APIs, real-time WebSocket services, Redis-backed architectures, all the way to the UI. Based in Kutaisi, building things that scale.
            </p>

            <div className="animate-fade-in-up opacity-0 delay-500 flex flex-wrap gap-4">
              <a href="#projects"
                className="px-7 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:scale-105"
                style={{ fontFamily: 'var(--font-mono)', background: 'var(--color-amber)', color: 'var(--color-void)', fontWeight: 700 }}>
                View Projects
              </a>
              <a href="#contact"
                className="px-7 py-3 text-sm tracking-widest uppercase transition-all duration-300 hover:opacity-80"
                style={{ fontFamily: 'var(--font-mono)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}>
                Get in Touch
              </a>
            </div>
          </div>

          {/* Right column — stats + floating card */}
          <div className="animate-fade-in opacity-0 delay-600 flex flex-col gap-6">
            <div className="grid grid-cols-3 gap-4">
              {[
                { num: '5+', label: 'Projects Shipped' },
                { num: '3+', label: 'Tech Stacks' },
                { num: '2025', label: 'BSc CS Expected' },
              ].map(s => (
                <div key={s.label} className="p-5 text-center card-hover" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>
                  <div className="text-3xl font-bold mb-1" style={{ fontFamily: 'var(--font-display)', color: 'var(--color-amber)' }}>{s.num}</div>
                  <div className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Terminal card */}
            <div className="p-6 animate-float" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>~/toma-danelia</span>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', lineHeight: 2 }}>
                <div><span style={{ color: 'var(--color-teal)' }}>›</span> <span style={{ color: 'var(--color-muted)' }}>whoami</span></div>
                <div style={{ color: 'var(--color-bright)' }}>toma_danelia</div>
                <div><span style={{ color: 'var(--color-teal)' }}>›</span> <span style={{ color: 'var(--color-muted)' }}>cat role.txt</span></div>
                <div style={{ color: 'var(--color-amber)' }}>Backend Developer // Full-Stack</div>
                <div><span style={{ color: 'var(--color-teal)' }}>›</span> <span style={{ color: 'var(--color-muted)' }}>ls skills/</span></div>
                <div style={{ color: 'var(--color-text)' }}>PHP Laravel Node.js ASP.NET React AWS</div>
                <div className="flex items-center gap-1">
                  <span style={{ color: 'var(--color-teal)' }}>›</span>
                  <span className="animate-blink" style={{ color: 'var(--color-amber)' }}>█</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3" style={{ color: 'var(--color-muted)' }}>
              <div className="w-2 h-2 rounded-full bg-green-400" style={{ boxShadow: '0 0 8px rgba(74,222,128,0.8)' }} />
              <span className="text-xs" style={{ fontFamily: 'var(--font-mono)' }}>Open to backend / full-stack roles</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-float">
        <span className="text-xs tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>scroll</span>
        <div className="h-8 w-px" style={{ background: 'linear-gradient(to bottom, var(--color-amber), transparent)' }} />
      </div>
    </section>
  )
}

function Skills() {
  const { ref, inView } = useInView()
  return (
    <section id="skills" className="py-32" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-8" ref={ref}>
        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">02 /</span>
            <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
          </div>
          <h2 className="text-5xl font-bold" style={{ color: 'var(--color-bright)', fontFamily: 'var(--font-display)' }}>
            Technical <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Arsenal</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(SKILLS).map(([category, items], i) => (
            <div key={category}
              className={`p-6 card-hover transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)', transitionDelay: `${i * 80}ms` }}>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-1 h-6" style={{ background: i % 2 === 0 ? 'var(--color-amber)' : 'var(--color-teal)' }} />
                <span className="text-xs font-semibold tracking-widest uppercase"
                  style={{ fontFamily: 'var(--font-mono)', color: i % 2 === 0 ? 'var(--color-amber)' : 'var(--color-teal)' }}>
                  {category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(skill => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const { ref, inView } = useInView()
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  return (
    <section id="projects" className="py-32 grid-bg" style={{ background: 'var(--color-void)' }}>
      <div className="max-w-7xl mx-auto px-8" ref={ref}>
        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">03 /</span>
            <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
          </div>
          <h2 className="text-5xl font-bold" style={{ color: 'var(--color-bright)', fontFamily: 'var(--font-display)' }}>
            Selected <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Work</span>
          </h2>
          <p className="mt-3 text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
            Every project is full-stack — I built both the backend and frontend.
          </p>
        </div>

        <div className="space-y-5">
          {PROJECTS.map((p, i) => (
            <div key={p.id}
              className={`group relative p-8 cursor-pointer card-hover transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)', transitionDelay: `${i * 100}ms` }}
              onMouseEnter={() => setHoveredId(p.id)} onMouseLeave={() => setHoveredId(null)}>

              {/* Accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 transition-all duration-300"
                style={{ background: hoveredId === p.id ? (p.color === 'amber' ? 'var(--color-amber)' : 'var(--color-teal)') : 'transparent' }} />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Project number */}
                <div className="lg:col-span-1">
                  <span className="text-4xl font-bold" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-border)', lineHeight: 1 }}>{p.id}</span>
                </div>

                {/* Main info */}
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold" style={{ color: 'var(--color-bright)', fontFamily: 'var(--font-display)' }}>{p.title}</h3>
                    <span className="px-2 py-0.5 text-xs rounded-sm"
                      style={{ fontFamily: 'var(--font-mono)', background: p.status === 'Live' ? 'rgba(74,222,128,0.15)' : 'rgba(30,45,61,0.8)', color: p.status === 'Live' ? '#4ade80' : 'var(--color-muted)', border: `1px solid ${p.status === 'Live' ? 'rgba(74,222,128,0.3)' : 'var(--color-border)'}` }}>
                      {p.status === 'Live' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 mr-1.5" style={{ verticalAlign: 'middle' }} />}
                      {p.status}
                    </span>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>{p.year}</span>
                  </div>
                  <p className="text-sm mb-1" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>{p.subtitle}</p>
                  <p className="text-sm leading-relaxed mt-3" style={{ color: 'var(--color-text)', lineHeight: 1.8 }}>{p.description}</p>
                  {p.link && (
                    <a href={`https://${p.link}`} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 mt-3 text-xs hover:opacity-70 transition-opacity"
                      style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-teal)' }}>
                      ↗ {p.link}
                    </a>
                  )}
                </div>

                {/* Stack */}
                <div className="lg:col-span-4 flex flex-col gap-3">
                  <div>
                    <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>Stack</div>
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map(s => <span key={s} className="tag">{s}</span>)}
                    </div>
                  </div>
                  <div className="mt-2 p-3 rounded-sm" style={{ background: 'rgba(0,0,0,0.3)', borderLeft: `2px solid ${p.color === 'amber' ? 'var(--color-amber)' : 'var(--color-teal)'}` }}>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-mono)' }}>
                      {p.highlight}
                    </p>
                  </div>
                </div>

                {/* Role badge */}
                <div className="lg:col-span-1 flex lg:justify-end">
                  <span className="text-xs px-3 py-1 rounded-sm" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(245,166,35,0.1)', color: 'var(--color-amber)', border: '1px solid rgba(245,166,35,0.2)' }}>
                    {p.role}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Experience() {
  const { ref, inView } = useInView()
  return (
    <section id="experience" className="py-32" style={{ background: 'var(--color-surface)' }}>
      <div className="max-w-7xl mx-auto px-8" ref={ref}>
        <div className={`mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-4 mb-4">
            <span className="section-label">04 /</span>
            <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
          </div>
          <h2 className="text-5xl font-bold" style={{ color: 'var(--color-bright)', fontFamily: 'var(--font-display)' }}>
            Experience &amp; <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Education</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div className={`transition-all duration-700 delay-100 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-teal)' }}>WORK</span>
              <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
            </div>

            <div className="relative pl-6" style={{ borderLeft: '1px solid var(--color-border)' }}>
              {/* Streaming Platform */}
              <div className="mb-10 relative">
                <div className="absolute -left-[25px] w-3 h-3 rounded-full border-2"
                  style={{ background: 'var(--color-amber)', borderColor: 'var(--color-amber)', top: '4px', boxShadow: '0 0 12px rgba(245,166,35,0.6)' }} />
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <h3 className="font-bold" style={{ color: 'var(--color-bright)', fontSize: '1.05rem' }}>Backend Developer</h3>
                  <span className="px-2 py-0.5 text-xs rounded-sm" style={{ fontFamily: 'var(--font-mono)', background: 'rgba(74,222,128,0.12)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.25)' }}>Current</span>
                </div>
                <div className="text-sm mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}>Streaming Platform — Telecomm1</div>
                <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>2025 — Present · Commercial</div>
                <ul className="space-y-2">
                  {[
                    'Production backend in Laravel + Node.js WebSocket server connected via Redis Pub/Sub',
                    'IP-based geo-restriction and traffic limiting system',
                    'Laravel Sanctum auth (Token + Cookie) for SPA and TV APK clients',
                    'Redis-optimized MySQL REST APIs with scalable service separation',
                  ].map(item => (
                    <li key={item} className="text-sm flex gap-2" style={{ color: 'var(--color-text)', lineHeight: 1.7 }}>
                      <span style={{ color: 'var(--color-amber)', flexShrink: 0 }}>›</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Driftless */}
              <div className="relative">
                <div className="absolute -left-[25px] w-3 h-3 rounded-full border-2"
                  style={{ background: 'var(--color-teal)', borderColor: 'var(--color-teal)', top: '4px', boxShadow: '0 0 12px rgba(0,212,170,0.5)' }} />
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold" style={{ color: 'var(--color-bright)', fontSize: '1.05rem' }}>Full-Stack Developer</h3>
                </div>
                <div className="text-sm mb-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-teal)' }}>Driftless — Public Tool</div>
                <div className="text-xs mb-3" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>2025 · Publicly Deployed</div>
                <ul className="space-y-2">
                  {[
                    'Scans Git repos and auto-generates full ASP.NET API route documentation',
                    'React frontend consumes generated types directly for seamless DX',
                    'Actively used by developers to speed up frontend-backend integration',
                  ].map(item => (
                    <li key={item} className="text-sm flex gap-2" style={{ color: 'var(--color-text)', lineHeight: 1.7 }}>
                      <span style={{ color: 'var(--color-teal)', flexShrink: 0 }}>›</span> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Education + profile */}
          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center gap-3 mb-8">
              <span className="text-xs tracking-widest" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}>EDUCATION</span>
              <div className="h-px flex-1" style={{ background: 'var(--color-border)' }} />
            </div>

            <div className="p-7 mb-6 card-hover" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold mb-1" style={{ color: 'var(--color-bright)', fontSize: '1.1rem' }}>BSc Computer Science</h3>
                  <div className="text-sm" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}>Kutaisi International University</div>
                  <div className="text-xs mt-1" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>2021 — 2026</div>
                </div>
                <div className="w-10 h-10 flex items-center justify-center" style={{ background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)' }}>
                  <span style={{ color: 'var(--color-amber)', fontSize: '1.2rem' }}>🎓</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Java', 'C#/ASP.NET', 'AWS', 'Cybersecurity', 'REST', 'PostgreSQL', 'Unit Testing & TDD'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="p-7 card-hover" style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)' }}>
              <div className="text-xs tracking-widest uppercase mb-5" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-teal)' }}>Languages</div>
              {[
                { lang: 'Georgian', level: 'Native', pct: 100 },
                { lang: 'English', level: 'Professional', pct: 85 },
                { lang: 'German', level: 'Intermediate', pct: 55 },
              ].map(l => (
                <div key={l.lang} className="mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm" style={{ color: 'var(--color-bright)' }}>{l.lang}</span>
                    <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>{l.level}</span>
                  </div>
                  <div className="h-1 rounded-full" style={{ background: 'var(--color-border)' }}>
                    <div className="h-1 rounded-full transition-all duration-1000" style={{ width: `${l.pct}%`, background: 'linear-gradient(to right, var(--color-amber), var(--color-teal))' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" className="py-32 relative overflow-hidden" style={{ background: 'var(--color-void)' }}>
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(245,166,35,0.05) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      
      <div className="max-w-4xl mx-auto px-8 relative" ref={ref}>
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-16" style={{ background: 'var(--color-border)' }} />
            <span className="section-label">05 / Let's Talk</span>
            <div className="h-px w-16" style={{ background: 'var(--color-border)' }} />
          </div>
          <h2 className="text-5xl font-bold mb-4" style={{ color: 'var(--color-bright)', fontFamily: 'var(--font-display)' }}>
            Ready to <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>Build</span> Together?
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed" style={{ color: 'var(--color-text)', lineHeight: 1.8 }}>
            I'm open to backend, full-stack, or API engineering roles. Let's talk about what you're building.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-5 transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { label: 'Email', value: 'toma.danelia@email.com', icon: '✉', href: 'mailto:toma.danelia@email.com' },
            { label: 'LinkedIn', value: '/in/toma-danelia', icon: '⟶', href: '#' },
            { label: 'GitHub', value: 'github.com/toma-danelia', icon: '⟶', href: '#' },
          ].map(c => (
            <a key={c.label} href={c.href}
              className="p-6 text-center card-hover block"
              style={{ background: 'var(--color-panel)', border: '1px solid var(--color-border)', textDecoration: 'none' }}>
              <div className="text-2xl mb-3">{c.icon}</div>
              <div className="text-xs mb-2" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-amber)' }}>{c.label}</div>
              <div className="text-sm" style={{ color: 'var(--color-text)', fontFamily: 'var(--font-mono)' }}>{c.value}</div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div className={`mt-20 pt-8 flex items-center justify-between flex-wrap gap-4 transition-all duration-700 delay-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          style={{ borderTop: '1px solid var(--color-border)' }}>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
            © 2025 Toma Danelia — Kutaisi, Georgia
          </span>
          <span className="text-xs" style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-muted)' }}>
            Built with React · TypeScript · Tailwind v4
          </span>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <div className="noise-bg">
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </div>
  )
}
