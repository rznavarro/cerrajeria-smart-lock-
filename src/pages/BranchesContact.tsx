import React from 'react';
import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';
import { buildWhatsAppUrl } from '../utils/whatsapp';
import { CotizadorForm } from '../components/CotizadorForm';
import {
  MapPin,
  Phone,
  MessageSquare,
  Mail,
  Clock,
  ShieldCheck,
  Building,
} from 'lucide-react';

interface BranchesContactProps {
  onNavigate: (path: string) => void;
}

export const BranchesContact: React.FC<BranchesContactProps> = ({ onNavigate }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Encabezado */}
      <section className="max-w-3xl space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#12161B] bg-black/5 px-3 py-1.5 rounded-md">
          <Building className="w-4 h-4 text-[#1E9E57]" />
          <span>Atención y asesoría técnica directa</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#12161B] tracking-tight leading-tight">
          Sucursales y contacto
        </h1>

        <p className="text-base sm:text-lg text-[#5B6772] leading-relaxed">
          Comunícate directamente con nuestros cerrajeros para cotizar cerraduras inteligentes con
          instalación, programar llaves de auto o resolver dudas de servicio técnico.
        </p>
      </section>

      {/* Tarjetas de Sucursales (§8.8: datos verificados, oculta si vacíos) */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold font-heading text-[#12161B]">
            Nuestras sucursales
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6772] mt-1">
            Atención presencial y cobertura de instalaciones a domicilio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_CONFIG.branches.map((branch) => {
            const hasDetails = branch.address || branch.hours || branch.mapUrl;
            return (
              <div
                key={branch.slug}
                className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#1E9E57]" />
                    <h3 className="font-heading font-bold text-xl text-[#12161B]">
                      {branch.name}
                    </h3>
                  </div>

                  {branch.address ? (
                    <p className="text-sm text-[#5B6772]">{branch.address}</p>
                  ) : (
                    <p className="text-sm text-[#5B6772] leading-relaxed">
                      Escríbenos y te decimos cuál sucursal te queda más cerca.
                    </p>
                  )}

                  {branch.hours && (
                    <div className="flex items-center gap-2 text-xs text-[#5B6772]">
                      <Clock className="w-4 h-4 text-[#12161B]" />
                      <span>{branch.hours}</span>
                    </div>
                  )}

                  {branch.mapUrl && (
                    <div className="pt-2">
                      <a
                        href={branch.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-[#12161B] hover:underline"
                      >
                        Ver mapa de Google Maps →
                      </a>
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-[#12161B]/10 grid grid-cols-2 gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      `Hola, quiero saber la ubicación exacta y servicios de la ${branch.name}.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 h-11 bg-[#1E9E57] hover:bg-[#17804A] text-white text-xs font-semibold rounded-[10px] transition-colors"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>WhatsApp</span>
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.phoneCallable}`}
                    onClick={() => trackAnalyticsEvent('clic_llamar', { context: branch.slug })}
                    className="flex items-center justify-center gap-2 h-11 border-2 border-[#12161B] text-[#12161B] hover:bg-black/5 text-xs font-semibold rounded-[10px] transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Llamar</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Información de contacto directo */}
      <section className="bg-[#12161B] text-white rounded-2xl p-6 sm:p-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#1E9E57]">
              <MessageSquare className="w-5 h-5" />
              <span className="font-semibold text-xs uppercase tracking-wider text-white">
                WhatsApp directo
              </span>
            </div>
            <a
              href={SITE_CONFIG.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold text-white hover:text-[#1E9E57] transition-colors block"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <p className="text-xs text-white/70">
              Respuestas rápidas para dudas sobre modelos y presupuestos con foto de tu puerta.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#1E9E57]">
              <Phone className="w-5 h-5" />
              <span className="font-semibold text-xs uppercase tracking-wider text-white">
                Llamadas telefónicas
              </span>
            </div>
            <a
              href={`tel:${SITE_CONFIG.phoneCallable}`}
              className="text-lg font-bold text-white hover:text-[#1E9E57] transition-colors block"
            >
              {SITE_CONFIG.phoneDisplay}
            </a>
            <p className="text-xs text-white/70">
              Atención inmediata de nuestros maestros cerrajeros.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#1E9E57]">
              <Mail className="w-5 h-5" />
              <span className="font-semibold text-xs uppercase tracking-wider text-white">
                Correo electrónico
              </span>
            </div>
            <a
              href={`mailto:${SITE_CONFIG.email}`}
              className="text-lg font-bold text-white hover:text-[#1E9E57] transition-colors block truncate"
            >
              {SITE_CONFIG.email}
            </a>
            <p className="text-xs text-white/70">
              Para cotizaciones corporativas, licitaciones o requerimientos de flotillas.
            </p>
          </div>
        </div>
      </section>

      {/* Cotizador integrado */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-heading text-[#12161B]">
            Formulario de cotización directa
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6772] mt-1">
            Elige tu servicio y envía los datos para recibir propuesta sin costo.
          </p>
        </div>

        <CotizadorForm />
      </section>
    </div>
  );
};
