import React from 'react';
import { SITE_CONFIG } from '../data/config';
import { Star } from 'lucide-react';

/**
 * Componente que SOLO se renderiza si la configuración contiene reseñas reales verificadas.
 * Prohibido inventar testimonios, calificaciones o cifras.
 */
export const ReviewsSection: React.FC = () => {
  if (!SITE_CONFIG.reviews || SITE_CONFIG.reviews.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-white border-t border-[#12161B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
            Opiniones de clientes
          </h2>
          <p className="text-sm text-[#5B6772] mt-2">
            Reseñas reales verificadas de instalaciones y servicios.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SITE_CONFIG.reviews.map((r) => (
            <div
              key={r.id}
              className="p-6 bg-[#F6F7F5] rounded-xl border border-[#12161B]/10 space-y-3"
            >
              <div className="flex items-center gap-1 text-amber-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-[#12161B] italic">"{r.comment}"</p>
              <div className="pt-2 border-t border-[#12161B]/10 text-xs text-[#5B6772]">
                <span className="font-semibold text-[#12161B]">{r.author}</span> · {r.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
