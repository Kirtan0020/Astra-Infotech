// Splits a `**highlighted**` marker out of a heading string into plain text
// segments, so callers can render the highlighted part with a different style.
export function splitHeading(heading = '') {
  return heading.split(/\*\*(.+?)\*\*/g).map((part, i) => ({
    text: part,
    highlighted: i % 2 === 1,
  }))
}
