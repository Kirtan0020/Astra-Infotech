import { splitHeading } from '../content/helpers.js'

// Renders a `**highlighted**`-marked string (see content/helpers.js) with the
// marked segment wrapped in the site's brand-gradient-text span. `\n` splits
// into separate lines via <br/>, matching how hero headings were hand-authored
// as multi-line JSX before becoming CMS-driven strings.
export default function HighlightText({ text = '' }) {
  return text.split('\n').map((line, i, arr) => (
    <span key={i}>
      {splitHeading(line).map((part, j) =>
        part.highlighted ? (
          <span key={j} className="brand-gradient-text">
            {part.text}
          </span>
        ) : (
          part.text
        )
      )}
      {i < arr.length - 1 && <br />}
    </span>
  ))
}
