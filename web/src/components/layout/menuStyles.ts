export const focusRing = 'focus-inset'

export const listPanel =
  'absolute top-full hidden flex-col gap-4 rounded-b-sm bg-neutral-50 p-4 ring-1 ring-neutral-100 ring-inset peer-aria-expanded:flex'

export const listLink = `block rounded-sm p-2 text-center text-body-xs font-medium text-neutral-900 transition-colors hover:text-brand-500 motion-reduce:transition-none ${focusRing}`

export const barCell = `flex items-center justify-center text-body-sm font-medium transition-[color,box-shadow] duration-300 ease-out motion-reduce:transition-none aria-expanded:text-(--h-active) ${focusRing}`
