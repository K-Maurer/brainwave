
import { useState, useEffect, useCallback } from "react";

export function AnimatedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1
    });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900/30">
      {/* Neuronale Verbindungen */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`neuron-${i}`}
            className="absolute opacity-[0.15]"
            style={{
              width: `${Math.random() * 400 + 100}px`,
              height: '1px',
              background: `linear-gradient(90deg, 
                transparent,
                rgba(59, 130, 246, ${0.3 + Math.random() * 0.4}),
                transparent
              )`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `
                rotate(${Math.random() * 360}deg)
                translateX(${mousePosition.x * 20}px)
                translateY(${mousePosition.y * 20}px)
              `,
              transition: 'transform 0.5s ease-out',
              animation: `pulse-translate ${8 + Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Synapsen (Knotenpunkte) */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`synapse-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              background: `radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 70%)`,
              boxShadow: '0 0 10px rgba(59,130,246,0.3)',
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `
                scale(${1 + Math.sin(Date.now() / 1000) * 0.2})
                translateX(${mousePosition.x * 30}px)
                translateY(${mousePosition.y * 30}px)
              `,
              transition: 'transform 0.8s ease-out',
              animation: `pulse-slow ${6 + Math.random() * 4}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Gehirnwellen-Animation */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`wave-${i}`}
            className="absolute w-full h-1 opacity-[0.05]"
            style={{
              top: `${30 + i * 20}%`,
              background: `linear-gradient(90deg, 
                transparent,
                rgba(59, 130, 246, 0.5),
                rgba(147, 51, 234, 0.5),
                transparent
              )`,
              transform: `translateY(${Math.sin(Date.now() / 2000 + i) * 50}px)`,
              animation: `wave ${10 + i * 2}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>

      {/* Verbessertes Gitternetz */}
      <div 
        className="absolute inset-0 bg-grid-white/[0.02]" 
        style={{ 
          backgroundSize: '30px 30px',
          backgroundImage: `
            linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
          `,
          transform: `
            translateX(${mousePosition.x * 10}px)
            translateY(${mousePosition.y * 10}px)
          `,
          transition: 'transform 1s ease-out',
        }}
      />
    </div>
  );
}
