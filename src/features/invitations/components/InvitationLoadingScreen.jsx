import '../../marketing/styles/marketing.css'

export function InvitationLoadingScreen() {
  return (
    <div
      className="marketing-page flex min-h-screen flex-col items-center justify-center px-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className="invitation-loader" aria-hidden>
        <span className="invitation-loader-orbit" />
        <span className="invitation-loader-orbit invitation-loader-orbit--delayed" />
        <svg viewBox="0 0 24 24" className="invitation-loader-heart" fill="currentColor">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>
      <p className="marketing-muted mt-8 text-sm tracking-wide">
        Cargando invitación
        <span className="invitation-loader-dots">
          <span>.</span>
          <span>.</span>
          <span>.</span>
        </span>
      </p>
    </div>
  )
}
