import React from 'react';
import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { MessageSquare, Phone } from 'lucide-react';

interface MobileBottomBarProps {
  currentModelCode?: string;
}

export const MobileBottomBar: React.FC<MobileBottomBarProps> = ({ currentModelCode }) => {
  const handleWhatsAppClick = () => {
    trackAnalyticsEvent('clic_whatsapp', { context: 'mobile_sticky_bar', model: currentModelCode });
    const msg = currentModelCode
      ? `Hola, quiero cotizar la cerradura ${currentModelCode} con instalación básica y garantía por escrito.`
      : 'Hola, quiero cotizar un servicio con Cerrajería Smart Lock.';
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    trackAnalyticsEvent('clic_llamar', { context: 'mobile_sticky_bar' });
  };

  return (
    <aside
      aria-label="Contacto rápido"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#F6F7F5]/98 border-t border-[#12161B]/15 px-3 py-2 shadow-2xl backdrop-blur-md"
    >
      <div className="max-w-md mx-auto grid grid-cols-2 gap-2">
        {/* WhatsApp Button (Min 48px tap target) */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center gap-2 h-12 bg-[#1E9E57] active:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] shadow-sm transition-colors cursor-pointer"
        >
          <MessageSquare className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="whitespace-nowrap">WhatsApp</span>
        </button>

        {/* Llamar Button (Min 48px tap target) */}
        <a
          href={`tel:${SITE_CONFIG.phoneCallable}`}
          onClick={handlePhoneClick}
          className="flex items-center justify-center gap-2 h-12 border-2 border-[#12161B] active:bg-[#12161B]/10 text-[#12161B] font-semibold text-sm rounded-[10px] transition-colors"
        >
          <Phone className="w-5 h-5 shrink-0 text-[#12161B]" aria-hidden="true" />
          <span className="whitespace-nowrap">Llamar</span>
        </a>
      </div>
    </aside>
  );
};
