import { blogPosts } from '../blogPosts.js'
import BlogPost from './BlogPost.jsx'
import Section from './ui/Section.jsx'

export default function Blog() {
  return (
    <>
      <Section className="min-h-dvh flex items-center pt-24 pb-16">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="max-w-3xl">
            <p className="font-mono text-sm text-accent mb-4">Thoughts & notes</p>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none text-text-primary">
              Blog
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-[60ch]">
              Reflections on computer science, ethics, privacy, and projects I'm working on.
            </p>
          </div>
        </div>
      </Section>

      <Section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6">
          {blogPosts.length === 0 ? (
            <p className="text-text-muted">No blog posts yet. Check back soon.</p>
          ) : (
            <div className="max-w-3xl space-y-8">
              {blogPosts.map((post) => (
                <BlogPost key={post.id} post={post} />
              ))}
            </div>
          )}
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
