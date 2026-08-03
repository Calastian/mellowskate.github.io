import { useEffect, useState } from 'react'
import Nav from './components/Nav.jsx'
import Home from './components/Home.jsx'
import Projects from './components/Projects.jsx'
import Blog from './components/Blog.jsx'

const SECTIONS = ['home', 'projects', 'blog']

const TITLES = {
  home: 'Christian Novgrod',
  projects: 'Christian Novgrod - Projects',
  blog: 'Christian Novgrod - Blog',
}

function getHashSection() {
  const hash = window.location.hash.substring(1)
  return SECTIONS.includes(hash) ? hash : 'home'
}

export default function App() {
  const [active, setActive] = useState(getHashSection)

  useEffect(() => {
    document.title = TITLES[active] || 'Christian Novgrod'
  }, [active])

  useEffect(() => {
    const onHashChange = () => setActive(getHashSection())
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = (sectionId) => {
    window.location.hash = sectionId
    setActive(sectionId)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }

  return (
    <div className="min-h-dvh">
      <Nav active={active} onNavigate={navigate} />
      {active === 'home' && <Home />}
      {active === 'projects' && <Projects />}
      {active === 'blog' && <Blog />}
    </div>
  )
}
