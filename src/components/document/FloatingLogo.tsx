
import { useEffect, useRef } from "react";

export function FloatingLogo() {
  const logoRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const pulseAnimation = () => {
      logo.style.transform = 'scale(1.05)';
      logo.style.filter = 'brightness(1.2) drop-shadow(0 0 10px rgba(59, 130, 246, 0.5))';
      
      setTimeout(() => {
        logo.style.transform = 'scale(1)';
        logo.style.filter = 'brightness(1) drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))';
      }, 1000);
    };

    const interval = setInterval(pulseAnimation, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 pointer-events-none">
      <img
        ref={logoRef}
        src="/lovable-uploads/4ec65eac-403b-498b-9880-28bb854b37c6.png"
        alt="Brainwave Logo"
        className="w-16 h-16 transition-all duration-1000 ease-in-out"
        style={{
          filter: 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.3))',
        }}
      />
    </div>
  );
}
