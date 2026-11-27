export const AIESEC_WORDMARK = '/aiesec-logo-blue.svg'

/** AIESEC wordmark with the LC name underneath. `light` renders it white for dark backgrounds. */
export default function Logo({ light = false, className = '' }) {
  return (
    <a href="#top" className={`group inline-flex flex-col items-start gap-1 ${className}`} aria-label="AIESEC in Hadrumet, back to top">
      <img
        src={AIESEC_WORDMARK}
        alt="AIESEC"
        width="126"
        height="18"
        className={`h-5 w-auto transition-opacity group-hover:opacity-80`}
      />
      <span className={`text-[11px] font-bold uppercase tracking-[0.28em] ${light ? 'text-white/70' : 'text-aiesec-dark/60'}`}>
        in Hadrumet
      </span>
    </a>
  )
}
