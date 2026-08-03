import Badge from './ui/Badge.jsx'
import Section from './ui/Section.jsx'
import RevealList from './ui/RevealList.jsx'
import { GithubLogo, ArrowSquareOut } from '@phosphor-icons/react'

const projects = [
  {
    title: 'ASL to Text Translator',
    subtitle: 'Transformer model for real-time sign language translation',
    description:
      'Developed a machine learning model that translates American Sign Language gestures into written English text in real time. Built with Python, OpenCV, and MediaPipe, running on commodity hardware like webcams. Bridges the communication gap between Deaf/hard-of-hearing individuals and non-ASL speakers.',
    tags: ['Python', 'OpenCV', 'MediaPipe', 'C++', 'Machine Learning', 'Transformers'],
    video: '/LiveDemoTranslating.mp4',
    link: null,
  },
  {
    title: 'Autonomous Robotics Research',
    subtitle: 'Applied ML research with the Unitree Go2 robotic dog',
    description:
      'Conducted applied research at the Appalachian State Robotics Lab investigating autonomous movement, environmental sensing, and system behavior on the Unitree Go2 quadruped. Developed machine learning models for mobility control and perception tasks using ROS2, documenting findings for ongoing lab research.',
    tags: ['ROS2', 'Machine Learning', 'Python', 'Robotics', 'Unitree Go2'],
    video: null,
    link: null,
  },
  {
    title: 'Home Lab Infrastructure',
    subtitle: 'Virtualization and services architecture',
    description:
      'Designed and deployed a complete home lab environment using Proxmox as a hypervisor. Manages game servers via Pterodactyl, network storage with TrueNAS, DNS filtering through Pi-hole, home automation with Home Assistant, and a PostgreSQL database powering custom mobile application APIs.',
    tags: ['Proxmox', 'Docker', 'Linux', 'TrueNAS', 'Pi-hole', 'PostgreSQL', 'Home Assistant'],
    video: null,
    link: null,
  },
]

export default function Projects() {
  return (
    <>
      <Section className="min-h-dvh flex items-center pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-3xl">
            <p className="font-mono text-sm text-accent mb-4">What I've built</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none text-text-primary">
              Projects
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-[60ch]">
              Selected work spanning machine learning, infrastructure, and full-stack
              development.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          <RevealList className="space-y-12">
            {projects.map((project) => (
              <div
                key={project.title}
                className="rounded-xl border border-border bg-surface-alt overflow-hidden"
              >
                {project.video && (
                  <video
                    width="100%"
                    controls
                    preload="metadata"
                    className="w-full aspect-video object-cover bg-surface"
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
                <div className="p-6 md:p-8">
                  <h2 className="text-xl md:text-2xl font-semibold text-text-primary">
                    {project.title}
                  </h2>
                  <p className="text-sm text-text-muted mt-1 mb-4">
                    {project.subtitle}
                  </p>
                  <p className="text-text-secondary leading-relaxed mb-5 max-w-[65ch]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <Badge key={tag}>{tag}</Badge>
                    ))}
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors duration-200"
                    >
                      <ArrowSquareOut size={16} weight="bold" />
                      View project
                    </a>
                  )}
                </div>
              </div>
            ))}
          </RevealList>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/Calastian"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors duration-200"
            >
              <GithubLogo size={18} weight="bold" />
              More on GitHub
            </a>
          </div>
        </div>
      </Section>

      <footer className="border-t border-border py-8 mt-16">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-sm text-text-muted">Christian Novgrod</p>
        </div>
      </footer>
    </>
  )
}
