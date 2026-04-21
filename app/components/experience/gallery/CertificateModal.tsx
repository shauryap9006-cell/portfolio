"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useGalleryStore } from "@stores";

const CertificateModal = () => {
  const { selectedCert, setSelectedCert } = useGalleryStore();
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCert) {
      // Entry Animation
      const tl = gsap.timeline();
      tl.set(overlayRef.current, { pointerEvents: "auto" });
      tl.to(overlayRef.current, { opacity: 1, duration: 0.3 });
      tl.fromTo(
        modalRef.current,
        { scale: 0.8, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.2)" },
        "-=0.2"
      );
    }
  }, [selectedCert]);

  const handleClose = () => {
    const tl = gsap.timeline({
      onComplete: () => setSelectedCert(null),
    });
    tl.to(modalRef.current, { scale: 0.9, opacity: 0, y: 10, duration: 0.3, ease: "power2.in" });
    tl.to(overlayRef.current, { opacity: 0, duration: 0.2 }, "-=0.1");
    tl.set(overlayRef.current, { pointerEvents: "none" });
  };

  if (!selectedCert) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-sm opacity-0 pointer-events-none p-4 md:p-8"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative max-w-5xl w-full bg-white/5 border border-white/20 rounded-3xl overflow-hidden shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Animated Liquid Background Blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[80px] animate-liquid" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500/20 rounded-full blur-[80px] animate-liquid-deferred" style={{ animationDelay: '-5s' }} />
        </div>

        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-6 right-6 z-20 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all border border-white/10 backdrop-blur-md group"
        >
          <svg className="transition-transform group-hover:rotate-90" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        {/* Image Container */}
        <div className="flex-[1.2] bg-white/5 flex items-center justify-center p-6 md:p-10 min-h-[300px]">
          <div className="relative group">
            {/* Image Glow */}
            <div className="absolute -inset-4 bg-white/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <img
              src={selectedCert.image}
              alt={selectedCert.title}
              className="relative max-w-full max-h-[65vh] object-contain rounded-xl shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Info Sidebar */}
        <div className="w-full md:w-[380px] p-8 md:p-12 bg-black/40 backdrop-blur-md border-l border-white/10 flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <div>
              <p className="text-blue-400 text-xs font-bold tracking-[0.2em] uppercase mb-2 opacity-80">
                {selectedCert.issuer}
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-[1.1] tracking-tight">
                {selectedCert.title}
              </h2>
              <div className="flex items-center gap-2 mt-4 text-neutral-400 font-medium text-sm">
                <span className="w-8 h-[1px] bg-white/20" />
                {selectedCert.date}
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-white/20 to-transparent w-full" />

            {selectedCert.description && (
              <p className="text-neutral-300 leading-relaxed text-base md:text-lg font-medium opacity-90">
                {selectedCert.description}
              </p>
            )}

            <div className="pt-8">
              <button
                onClick={handleClose}
                className="group relative w-full py-4 px-8 bg-white text-black font-bold rounded-2xl overflow-hidden transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                <span className="relative">Return to Gallery</span>
              </button>
            </div>
          </div>
          
          {/* Sidebar Liquid Accents */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-[40px] -mr-16 -mt-16" />
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
