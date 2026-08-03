'use client'

import { useEffect, useRef } from 'react'

export default function BlogPost({ post }) {
  const commentsRef = useRef(null)

  useEffect(() => {
    const container = commentsRef.current
    if (!container) return

    const script = document.createElement('script')
    script.src = 'https://utteranc.es/client.js'
    script.setAttribute('repo', 'Calastian/Calastian.github.io')
    script.setAttribute('issue-term', 'pathname')
    script.setAttribute('issue-number', post.id)
    script.setAttribute('theme', 'github-dark')
    script.setAttribute('crossorigin', 'anonymous')
    script.async = true
    container.appendChild(script)

    return () => {
      container.innerHTML = ''
    }
  }, [post.id])

  return (
    <article className="rounded-xl border border-border bg-surface-alt p-6 md:p-8 transition-all duration-300 hover:border-text-muted">
      <h2 className="text-xl font-semibold text-text-primary leading-snug">
        {post.title}
      </h2>
      <p className="text-sm text-text-muted mt-1.5 mb-5">{post.date}</p>
      <div
        className="prose-custom text-text-secondary leading-relaxed space-y-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <div className="mt-8 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-text-primary mb-4">Comments</h3>
        <div ref={commentsRef} />
      </div>
    </article>
  )
}
