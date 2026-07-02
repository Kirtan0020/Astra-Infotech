import DOMPurify from 'dompurify'
import Reveal from '../Reveal.jsx'

// Sanitized on render, not just on save — defense-in-depth in case the
// stored HTML is ever edited directly (e.g. a future DB migration/import)
// bypassing the admin form.
export default function RichTextSection({ data = {} }) {
  const clean = DOMPurify.sanitize(data.html ?? '')

  return (
    <section className="relative pb-24 pt-16">
      <div className="container-px mx-auto max-w-2xl">
        <Reveal>
          {data.eyebrow && <span className="section-eyebrow">{data.eyebrow}</span>}
          {data.heading && (
            <h2 className="font-display text-3xl text-[var(--color-text)] md:text-5xl">{data.heading}</h2>
          )}
          <div
            className="mt-6 space-y-4 text-base leading-relaxed text-[var(--color-text)]/70 [&_a]:underline [&_a]:underline-offset-4 [&_strong]:text-[var(--color-text)]"
            dangerouslySetInnerHTML={{ __html: clean }}
          />
        </Reveal>
      </div>
    </section>
  )
}
