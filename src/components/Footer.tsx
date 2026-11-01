import React from 'react';
import { SITE_CONFIG } from '../data/config';
import { Phone, Mail, MessageSquare, ShieldCheck, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="bg-[#12161B] text-[#F6F7F5] pt-14 pb-24 lg:pb-14 border-t border-[#12161B]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Bio */}
          <div className="md:col-span-1 space-y-4">
            <h3 className="font-heading text-xl font-bold text-white tracking-tight">
              Cerrajería Smart Lock
            </h3>
            <p className="text-sm text-[#F6F7F5]/70 leading-relaxed">
              Venta, instalación, programación y reparación de cerraduras inteligentes para casa,
              rentas vacacionales y empresas. Llaves automotrices y cerrajería residencial.
            </p>
            <div className="inline-flex items-center gap-2 text-xs text-[#1E9E57] bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>1 año de garantía por escrito</span>
            </div>
          </div>

          {/* Col 2: Secciones principales */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Navegación
            </h4>
            <ul className="space-y-2 text-sm text-[#F6F7F5]/80">
              <li>
                <a
                  href="/cerraduras-inteligentes"
                  onClick={(e) => handleNavClick(e, '/cerraduras-inteligentes')}
                  className="hover:text-white transition-colors"
                >
                  Cerraduras inteligentes
                </a>
              </li>
              <li>
                <a
                  href="/llaves-automotrices"
                  onClick={(e) => handleNavClick(e, '/llaves-automotrices')}
                  className="hover:text-white transition-colors"
                >
                  Llaves automotrices y flotillas
                </a>
              </li>
              <li>
                <a
                  href="/cerrajeria-y-servicio-tecnico"
                  onClick={(e) => handleNavClick(e, '/cerrajeria-y-servicio-tecnico')}
                  className="hover:text-white transition-colors"
                >
                  Cerrajería y servicio técnico (Yale, Samsung)
                </a>
              </li>
              <li>
                <a
                  href="/sucursales-y-contacto"
                  onClick={(e) => handleNavClick(e, '/sucursales-y-contacto')}
                  className="hover:text-white transition-colors"
                >
                  Sucursales y contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Sucursales conocidas */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Sucursales
            </h4>
            <div className="space-y-2.5 text-sm text-[#F6F7F5]/80">
              {SITE_CONFIG.branches.map((b) => (
                <div key={b.slug} className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#1E9E57] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-white">{b.name}</span>
                    <p className="text-xs text-[#F6F7F5]/60 mt-0.5">
                      Escríbenos y te decimos cuál sucursal te queda más cerca.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 4: Contacto directo */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Contacto y cotizaciones
            </h4>
            <div className="space-y-2 text-sm text-[#F6F7F5]/80">
              <a
                href={SITE_CONFIG.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#1E9E57] transition-colors"
              >
                <MessageSquare className="w-4 h-4 text-[#1E9E57]" />
                <span>WhatsApp: {SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={`tel:${SITE_CONFIG.phoneCallable}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-[#5B6772]" />
                <span>Llamadas: {SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#5B6772]" />
                <span className="truncate">{SITE_CONFIG.email}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Legal & Verification notice */}
        <div className="pt-8 text-xs text-[#F6F7F5]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p>
            © {new Date().getFullYear()} Cerrajería Smart Lock. Todos los derechos reservados.
          </p>
          <p className="text-left sm:text-right max-w-lg text-[11px] text-[#F6F7F5]/40">
            {SITE_CONFIG.whatsappVerificationNote}
          </p>
        </div>
      </div>
    </footer>
  );
};
