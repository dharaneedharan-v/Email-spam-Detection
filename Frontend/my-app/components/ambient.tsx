"use client"

export default function Ambient() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-20 h-72 w-72 rounded-full bg-amber-300/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-20 h-80 w-80 rounded-full bg-emerald-300/30 blur-3xl" />
      </div>
      <style jsx>{`
        @keyframes floaty1 {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-8px) translateX(4px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        @keyframes floaty2 {
          0% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(10px) translateX(-6px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        div :global(.floaty-1) {
          animation: floaty1 10s ease-in-out infinite;
        }
        div :global(.floaty-2) {
          animation: floaty2 12s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}
