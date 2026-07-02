export default function GradientBlob({ className = '' }) {
  return (
    <div className={`blob-drift relative mx-auto h-[300px] w-[300px] md:h-[380px] md:w-[380px] ${className}`}>
      <div
        aria-hidden="true"
        className="blob-morph h-full w-full opacity-80 shadow-[0_40px_90px_-20px_rgba(108,99,255,0.45)]"
        style={{
          background: 'linear-gradient(135deg, #4F6EF7 0%, #8B5CF6 55%, #D946EF 100%)',
        }}
      />
    </div>
  )
}
