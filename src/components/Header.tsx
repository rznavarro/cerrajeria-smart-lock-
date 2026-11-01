import React, { useState } from 'react';
import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { Menu, X, MessageSquare, Phone } from 'lucide-react';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onOpenCotizador?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Cerraduras inteligentes', path: '/cerraduras-inteligentes' },
    { label: 'Llaves automotrices', path: '/llaves-automotrices' },
    { label: 'Cerrajería y servicio técnico', path: '/cerrajeria-y-servicio-tecnico' },
    { label: 'Sucursales y contacto', path: '/sucursales-y-contacto' },
  ];

  const handleWhatsAppClick = () => {
    trackAnalyticsEvent('clic_whatsapp', { context: 'header_cta' });
    window.open(
      buildWhatsAppUrl('Hola, quiero cotizar con Cerrajería Smart Lock.'),
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F6F7F5]/95 backdrop-blur-md border-b border-[#12161B]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-18">
          {/* Zone 1: Brand Wordmark */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-2.5 text-lg sm:text-xl font-bold tracking-tight text-[#12161B] whitespace-nowrap shrink-0 group focus-visible:ring-2 focus-visible:ring-[#1E9E57] rounded-md"
            aria-label="Cerrajería Smart Lock - Inicio"
          >
            <img
              src="/logo/logo.png"
              alt="Logo Cerrajería Smart Lock"
              className="h-9 sm:h-10 w-auto object-contain shrink-0"
              width={40}
              height={40}
            />
            <span className="font-heading">Cerrajería Smart Lock</span>
          </a>

          {/* Zone 2: 4 nav links (single line, no pill enclosure) */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5B6772]"
          >
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
                    isActive
                      ? 'text-[#12161B] font-semibold border-b-2 border-[#12161B]'
                      : 'hover:text-[#12161B]'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={handleWhatsAppClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#1E9E57] hover:bg-[#17804A] text-white text-sm font-semibold rounded-[10px] shadow-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#1E9E57]"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Cotizar por WhatsApp</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-[10px] text-[#12161B] hover:bg-black/5 focus-visible:ring-2 focus-visible:ring-[#1E9E57]"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú de navegación'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#12161B]/10 bg-[#F6F7F5] px-4 pt-3 pb-6 shadow-xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-3 py-2.5 text-base rounded-[10px] transition-colors ${
                    isActive
                      ? 'bg-[#12161B] text-white font-semibold'
                      : 'text-[#12161B] hover:bg-black/5 font-medium'
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>
          <div className="mt-4 pt-4 border-t border-[#12161B]/10 flex flex-col gap-2.5">
            <button
              onClick={handleWhatsAppClick}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold rounded-[10px] shadow-sm text-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cotizar por WhatsApp</span>
            </button>
            <a
              href={`tel:${SITE_CONFIG.phoneCallable}`}
              onClick={() => trackAnalyticsEvent('clic_llamar', { context: 'mobile_drawer' })}
              className="w-full flex items-center justify-center gap-2 py-3 border border-[#12161B] text-[#12161B] font-semibold rounded-[10px] text-sm"
            >
              <Phone className="w-4 h-4" />
              <span>Llamar {SITE_CONFIG.phoneDisplay}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
