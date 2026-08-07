import { Fragment } from 'react'
import { motion } from 'motion/react'
import Button from './ui/Button.jsx'
import Badge from './ui/Badge.jsx'
import Section from './ui/Section.jsx'
import RevealList from './ui/RevealList.jsx'
import useTypewriter from '../hooks/useTypewriter.js'
import { GithubLogo, Envelope, LinkedinLogo, GraduationCap, Certificate } from '@phosphor-icons/react'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C', 'C++', 'Go', 'Haskell', 'SQL', 'HTML', 'CSS'],
  },
  {
    title: 'ML & Robotics',
    skills: ['ROS2', 'TensorFlow', 'PyTorch', 'OpenCV', 'MediaPipe', 'NumPy', 'Pandas'],
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'Linux', 'Proxmox', 'TrueNAS', 'Pi-hole', 'Cloudflare', 'CI/CD'],
  },
  {
    title: 'Frameworks & Tools',
    skills: ['React', 'Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'MySQL', 'Git', 'GitHub'],
  },
]

const experience = [
  {
    title: 'Founder / Lead Developer',
    company: 'Nano Software Services LLC',
    companyUrl: 'https://nanosoftwareservices.com',
    duration: 'May 2025 - Present',
    points: [
      'Founded and led a software solutions company delivering custom applications and technical systems for clients, overseeing projects from architecture through production deployment.',
      'Designed and implemented secure authentication systems, JavaScript-based REST APIs, and PostgreSQL-backed applications, prioritizing data protection and system integrity.',
      'Managed a team of developers and conducted code reviews through GitHub, enforcing quality standards, collaboration norms, and on-time delivery.',
      'Built and maintained secure deployment pipelines using GitHub Container Registry and Cloudflare Tunnels, hardening production environments.',
      'Directed technical strategy and daily operations, balancing client communication, architecture decisions, and cross-functional team leadership.',
    ],
  },
  {
    title: 'Robotics Researcher',
    company: 'Robotics Lab, Appalachian State University',
    companyUrl: null,
    duration: 'Jan 2026 - May 2026',
    points: [
      'Conducted applied research with the Unitree Go2 robotic dog, investigating autonomous movement, sensing, and system behavior using machine learning and ROS2.',
      'Worked hands-on with robotic hardware and software systems to test mobility, control, and applied research concepts, documenting findings for the lab.',
    ],
  },
  {
    title: 'IT / POS Field Technician',
    company: 'Dynamic Trades',
    companyUrl: null,
    duration: 'May 2018 - Aug 2018',
    points: [
      'Installed, configured, and supported IT hardware and point-of-sale systems across client sites in Lake Tahoe, CA, ensuring reliable business operations.',
      'Troubleshot hardware and software issues under time pressure, coordinating with other departments to meet project deadlines.',
    ],
  },
]

const certifications = [
  'UX Foundations: Usability Testing',
  'HTML for Programmers',
  'Writing White Papers',
  'Social & Behavioral Research Course',
]

export default function Home() {
  const { completedWords, currentWord, showCursor } = useTypewriter({
    words: ['Christian', 'Novgrod'],
    speed: 120,
  })

  return (
    <>
      <Section className="min-h-dvh flex items-center pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-3xl">
            <p className="font-mono text-sm text-accent mb-4">Hello, I'm</p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-none text-text-primary">
              {completedWords.map((word, i) => (
                <Fragment key={i}>
                  {word}
                  <br />
                </Fragment>
              ))}
              {currentWord}
              {showCursor && (
                <motion.span
                  animate={{ opacity: [1, 1, 0, 0] }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    times: [0, 0.5, 0.5, 1],
                  }}
                  className="text-accent font-light"
                >
                  |
                </motion.span>
              )}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-text-secondary leading-relaxed max-w-[60ch]">
              Computer science graduate and software developer building tools at the
              intersection of machine learning, robotics, infrastructure, and full-stack
              engineering.
            </p>
            <div className="flex flex-wrap gap-3 mt-8">
              <Button size="lg" onClick={() => window.location.hash = 'projects'}>View my work</Button>
              <Button variant="secondary" size="lg" href="https://github.com/Calastian" target="_blank" rel="noreferrer">
                <GithubLogo size={18} weight="bold" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-10">
            Skills
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <RevealList>
              {skillCategories.map((cat) => (
                <div
                  key={cat.title}
                  className="rounded-xl border border-border bg-surface-alt p-5"
                >
                  <h3 className="font-mono text-xs text-accent mb-3 tracking-wide">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((skill) => (
                      <Badge key={skill}>{skill}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </RevealList>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-10">
            Experience
          </h2>
          <div className="max-w-2xl">
            <RevealList>
              {experience.map((exp) => (
                <div
                  key={exp.title}
                  className="relative pl-6 border-l-2 border-border pb-8 last:pb-0"
                >
                  <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-accent" />
                  <h3 className="text-lg font-semibold text-text-primary">{exp.title}</h3>
                  <p className="text-sm text-accent font-medium mt-0.5">
                    {exp.companyUrl ? (
                      <a href={exp.companyUrl} target="_blank" rel="noreferrer" className="hover:underline">
                        {exp.company}
                      </a>
                    ) : (
                      exp.company
                    )}
                  </p>
                  <p className="text-sm text-text-muted mt-1 mb-3">{exp.duration}</p>
                  <ul className="space-y-1.5">
                    {exp.points.map((point, i) => (
                      <li
                        key={i}
                        className="text-sm text-text-secondary leading-relaxed"
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </RevealList>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-10">
            Education
          </h2>
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-surface-alt overflow-hidden">
              <div className="border-l-[3px] border-l-blue-400 p-6">
                <div className="flex items-start gap-3">
                  <GraduationCap size={24} weight="bold" className="text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary">
                      B.S. Computer Science
                    </h3>
                    <p className="text-sm text-blue-400 font-medium mt-0.5">
                      Appalachian State University, Boone, NC
                    </p>
                    <p className="text-sm text-text-muted mt-1">Aug 2022 - Dec 2025</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <Badge className="border-blue-400/30 text-blue-400 bg-blue-400/10">
                        Cybersecurity Minor
                      </Badge>
                      <Badge className="border-blue-400/30 text-blue-400 bg-blue-400/10">
                        Data Science Certificate
                      </Badge>
                      <Badge className="border-blue-400/30 text-blue-400 bg-blue-400/10">
                        Dean's List
                      </Badge>
                      <Badge className="border-blue-400/30 text-blue-400 bg-blue-400/10">
                        Cum Laude
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-10">
            Certifications
          </h2>
          <div className="max-w-2xl">
            <div className="rounded-xl border border-border bg-surface-alt p-6">
              <div className="flex items-start gap-3">
                <Certificate size={22} weight="bold" className="text-accent mt-0.5 shrink-0" />
                <ul className="space-y-2">
                  {certifications.map((cert) => (
                    <li key={cert} className="text-sm text-text-secondary">
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-text-primary mb-10">
            Contact
          </h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="secondary" href="mailto:ChristianNovgrod.dev@gmail.com">
              <Envelope size={18} weight="bold" />
              ChristianNovgrod.dev@gmail.com
            </Button>
            <Button variant="secondary" href="https://github.com/Calastian" target="_blank" rel="noreferrer">
              <GithubLogo size={18} weight="bold" />
              github.com/Calastian
            </Button>
            <Button variant="secondary" href="https://linkedin.com/in/christian-novgrod" target="_blank" rel="noreferrer">
              <LinkedinLogo size={18} weight="bold" />
              LinkedIn
            </Button>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm text-text-muted">
            Christian Novgrod
          </p>
        </div>
      </footer>
    </>
  )
}
