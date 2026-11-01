import React from 'react';
import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';
import { getTechServiceQuoteUrl, buildWhatsAppUrl } from '../utils/whatsapp';
import { CotizadorForm } from '../components/CotizadorForm';
import {
  Wrench,
  ShieldCheck,
  DoorClosed,
  KeyRound,
  RotateCcw,
  Sparkles,
  MessageSquare,
  Phone,
  Check,
} from 'lucide-react';

interface LocksmithServiceProps {
  onNavigate: (path: string) => void;
}

export const LocksmithService: React.FC<LocksmithServiceProps> = ({ onNavigate }) => {
  const handleTechConsult = (brand?: string) => {
    trackAnalyticsEvent('clic_whatsapp', { context: 'servicio_tecnico_page', brand });
    window.open(getTechServiceQuoteUrl(brand), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Hero Sección */}
      <section className="max-w-3xl space-y-5">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#12161B] bg-black/5 px-3 py-1.5 rounded-md">
          <Wrench className="w-4 h-4 text-[#1E9E57]" />
          <span>Servicio multimarca especializado</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#12161B] tracking-tight leading-tight">
          Cerrajería residencial y servicio técnico para todas las marcas
        </h1>

        <p className="text-base sm:text-lg text-[#5B6772] leading-relaxed">
          Reparación, programación y mantenimiento de cerraduras inteligentes de cualquier marca
          (incluyendo Yale y Samsung), además de servicios completos de cerrajería tradicional y
          puertas de cristal.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => handleTechConsult()}
            className="inline-flex items-center gap-2 h-[52px] px-7 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] shadow-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Consultar por WhatsApp</span>
          </button>
        </div>
      </section>

      {/* BLOQUE 1: SERVICIO TÉCNICO A CERRADURAS INTELIGENTES */}
      <section className="bg-white rounded-2xl border border-[#12161B]/10 p-6 sm:p-10 space-y-8">
        <div>
          <span className="text-xs font-semibold text-[#1E9E57] uppercase tracking-wider">
            Soporte y reparación digital
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B] mt-1">
            Servicio técnico para todas las marcas, como Yale y Samsung
          </h2>
          <p className="text-sm text-[#5B6772] mt-2 max-w-3xl leading-relaxed">
            Si compraste tu cerradura inteligente en otra tienda o por internet y presenta fallas,
            nuestros técnicos cuentan con las herramientas y el conocimiento para restablecer su
            funcionamiento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
            <RotateCcw className="w-5 h-5 text-[#12161B]" />
            <h3 className="font-heading font-bold text-sm text-[#12161B]">
              Re-programación y desbloqueo
            </h3>
            <p className="text-xs text-[#5B6772]">
              Recuperación de contraseñas maestras, reasignación de administradores y reseteo de fábrica
              seguro.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
            <Wrench className="w-5 h-5 text-[#12161B]" />
            <h3 className="font-heading font-bold text-sm text-[#12161B]">
              Ajuste y alineación de mecanismo
            </h3>
            <p className="text-xs text-[#5B6772]">
              Corrección de pestillos trabados, manijas sueltas o contrachapas desfasadas que impiden
              el cierre automático.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
            <Sparkles className="w-5 h-5 text-[#12161B]" />
            <h3 className="font-heading font-bold text-sm text-[#12161B]">
              Enlace con apps móviles
            </h3>
            <p className="text-xs text-[#5B6772]">
              Solución a problemas de vinculación Wi-Fi o Bluetooth en apps como Tuya, Smart Life o
              TTLock.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
            <KeyRound className="w-5 h-5 text-[#12161B]" />
            <h3 className="font-heading font-bold text-sm text-[#12161B]">
              Copias de llaves mecánicas
            </h3>
            <p className="text-xs text-[#5B6772]">
              Duplicados de las llaves físicas de emergencia especiales que acompañan a las cerraduras
              digitales.
            </p>
          </div>
        </div>

        <div className="pt-2 flex flex-wrap gap-2 text-xs">
          <span className="font-semibold text-[#12161B]">Marcas frecuentes atendidas:</span>
          {['Yale', 'Samsung', 'TTLock', 'Tuya Smart', 'Philips', 'August', 'Schlage'].map((b) => (
            <button
              key={b}
              onClick={() => handleTechConsult(b)}
              className="px-2.5 py-1 bg-[#12161B]/5 hover:bg-[#12161B] hover:text-white rounded-md transition-colors cursor-pointer"
            >
              Consultar {b}
            </button>
          ))}
        </div>
      </section>

      {/* BLOQUE 2: CERRAJERÍA RESIDENCIAL Y COMERCIAL */}
      <section className="space-y-8">
        <div>
          <span className="text-xs font-semibold text-[#5B6772] uppercase tracking-wider">
            Tradición y seguridad física
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B] mt-1">
            Cerrajería residencial y servicios a puertas de cristal
          </h2>
          <p className="text-sm text-[#5B6772] mt-2 max-w-3xl leading-relaxed">
            Protegemos tu hogar, oficina o negocio con servicios profesionales de cerrajería
            mecánica y cerrojos de alta seguridad.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <DoorClosed className="w-6 h-6 text-[#1E9E57]" />
            <h3 className="font-heading font-bold text-base text-[#12161B]">
              Venta e instalación de cerraduras
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Cerraduras de sobreponer, embutir, cerrojos auxiliares y manijas de marcas reconocidas
              para puertas principales e interiores.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <RotateCcw className="w-6 h-6 text-[#1E9E57]" />
            <h3 className="font-heading font-bold text-base text-[#12161B]">
              Cambios de combinación
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Inhabilita llaves anteriores sin cambiar toda la cerradura al mudarte de casa o cambiar
              de inquilinos.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <KeyRound className="w-6 h-6 text-[#1E9E57]" />
            <h3 className="font-heading font-bold text-base text-[#12161B]">
              Hechura de llaves y duplicados
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Elaboración de llaves a partir del cilindro en caso de pérdida total y duplicados al
              instante de alta precisión.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <Sparkles className="w-6 h-6 text-[#1E9E57]" />
            <h3 className="font-heading font-bold text-base text-[#12161B]">
              Servicios a puertas de cristal
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Instalación, ajuste y mantenimiento de chapas para canceles, puertas de cristal templado
              de oficinas y comercios.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <Wrench className="w-6 h-6 text-[#1E9E57]" />
            <h3 className="font-heading font-bold text-base text-[#12161B]">
              Reparación y mantenimiento
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Lubricación, calibración de cilindros y cambio de resortes o partes internas desgastadas.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <ShieldCheck className="w-6 h-6 text-[#1E9E57]" />
            <h3 className="font-heading font-bold text-base text-[#12161B]">
              Garantía en mano de obra
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Todos nuestros trabajos son realizados por cerrajeros calificados con garantía en cada
              ajuste e instalación.
            </p>
          </div>
        </div>
      </section>

      {/* Cotizador integrado */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-heading text-[#12161B]">
            Cotiza tu servicio técnico o cerrajería
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6772] mt-1">
            Describe tu requerimiento y te responderemos con presupuesto y tiempo estimado.
          </p>
        </div>

        <CotizadorForm initialService="servicio_tecnico" />
      </section>
    </div>
  );
};
