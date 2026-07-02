import { useEffect } from 'react'

// Native (non-passive) wheel listener so preventDefault can redirect vertical
// wheel input into horizontal track scrolling — React's synthetic onWheel is
// registered passive and can't stop the page from scrolling underneath it.
// Moves one card per gesture (debounced) via the same `scrollFn` the arrow
// buttons use, since the track's scroll-snap fights raw `scrollLeft +=` deltas
// and quietly reverts them. At either edge, wheel input is left alone so the
// page scroll takes over.
export function useTrackWheelScroll(trackRef, scrollFn) {
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let locked = false

    const onWheel = (e) => {
      const maxScroll = track.scrollWidth - track.clientWidth
      if (maxScroll <= 0) return
      const atStart = track.scrollLeft <= 4
      const atEnd = track.scrollLeft >= maxScroll - 4
      const dir = e.deltaY > 0 ? 1 : -1
      if ((dir > 0 && atEnd) || (dir < 0 && atStart)) return

      e.preventDefault()
      if (locked) return
      locked = true
      scrollFn(dir)
      setTimeout(() => {
        locked = false
      }, 500)
    }

    track.addEventListener('wheel', onWheel, { passive: false })
    return () => track.removeEventListener('wheel', onWheel)
  }, [trackRef, scrollFn])
}

export function makeTrackScroller(trackRef) {
  return (dir) => {
    const track = trackRef.current
    if (!track) return
    const maxScroll = track.scrollWidth - track.clientWidth
    const atEnd = track.scrollLeft >= maxScroll - 4
    const atStart = track.scrollLeft <= 4

    if (dir > 0 && atEnd) {
      track.scrollTo({ left: 0, behavior: 'smooth' })
    } else if (dir < 0 && atStart) {
      track.scrollTo({ left: maxScroll, behavior: 'smooth' })
    } else {
      track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' })
    }
  }
}
