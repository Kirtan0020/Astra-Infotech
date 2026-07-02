import {
  HiOutlineCode,
  HiOutlineDeviceMobile,
  HiOutlineColorSwatch,
  HiOutlineSparkles,
  HiOutlineSearch,
  HiOutlinePencilAlt,
  HiOutlineTrendingUp,
} from 'react-icons/hi'

// Shared icon-key -> component lookup so services/process items reference an
// explicit `icon` string (stored in the DB) instead of being paired to a
// hardcoded array by position, which breaks the moment items are reordered.
export const iconRegistry = {
  code: HiOutlineCode,
  'device-mobile': HiOutlineDeviceMobile,
  'color-swatch': HiOutlineColorSwatch,
  sparkles: HiOutlineSparkles,
  search: HiOutlineSearch,
  'pencil-alt': HiOutlinePencilAlt,
  'trending-up': HiOutlineTrendingUp,
}

export function getIcon(key) {
  return iconRegistry[key] ?? HiOutlineSparkles
}
