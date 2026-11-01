import React, { useState } from 'react';
import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';
import {
  getCarKeyQuoteUrl,
  getFleetQuoteUrl,
  buildWhatsAppUrl,
} from '../utils/whatsapp';
import { CotizadorForm } from '../components/CotizadorForm';
import {
  Car,
  KeyRound,
  ShieldCheck,
  Building,
  Wrench,
  Check,
  MessageSquare,
  Battery,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AutomotiveProps {
  onNavigate: (path: string) => void;
}

export const Automotive: React.FC<AutomotiveProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'particular' | 'flotilla'>('particular');

  const handleFleetWhatsApp = () => {
    trackAnalyticsEvent('clic_whatsapp', { context: 'pagina_flotillas' });
    window.open(getFleetQuoteUrl(), '_blank', 'noopener,noreferrer');
  };

  const handleCarKeyWhatsApp = () => {
    trackAnalyticsEvent('clic_whatsapp', { context: 'pagina_llaves_auto' });
    window.open(getCarKeyQuoteUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-16">
      {/* Hero Sección */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#12161B] bg-black/5 px-3 py-1.5 rounded-md">
            <Car className="w-4 h-4 text-[#1E9E57]" />
            <span>Cerrajería automotriz con tecnología de transponder</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold font-heading text-[#12161B] tracking-tight leading-tight">
            Llaves automotrices con chip, copias y servicio para flotillas
          </h1>

          <p className="text-base sm:text-lg text-[#5B6772] leading-relaxed">
            Duplicados de alta precisión, hechura de llaves nuevas cuando perdiste todas, cambio de
            carcasas rotas y mantenimiento preventivo para controles remotos.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={handleCarKeyWhatsApp}
              className="flex items-center justify-center gap-2 h-[52px] px-7 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cotizar la llave de mi auto</span>
            </button>

            <button
              type="button"
              onClick={handleFleetWhatsApp}
              className="flex items-center justify-center gap-2 h-[52px] px-6 border-2 border-[#12161B] hover:bg-black/5 text-[#12161B] font-semibold text-sm rounded-[10px] transition-colors cursor-pointer"
            >
              <Building className="w-4 h-4" />
              <span>Cotizar para mi flota</span>
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#12161B]/10 shadow-lg bg-white">
            <img
              src="/src/assets/images/car_key_service_1793498230210.jpg"
              alt="Copia y programación de llaves automotrices con chip"
              className="w-full h-auto aspect-4/3 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Servicios detallados */}
      <section className="space-y-8">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
            Servicios automotrices disponibles
          </h2>
          <p className="text-sm text-[#5B6772] mt-1">
            Mano de obra calificada y equipos de corte y programación computarizados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F6F7F5] flex items-center justify-center text-[#12161B]">
              <KeyRound className="w-5 h-5 text-[#1E9E57]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12161B]">
              Copias y duplicados con chip
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Copia idéntica tallada con precisión computarizada y enlace del transponder a la
              computadora de tu vehículo.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F6F7F5] flex items-center justify-center text-[#12161B]">
              <Wrench className="w-5 h-5 text-[#1E9E57]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12161B]">
              Llaves nuevas por pérdida total
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Si extraviaste todas las llaves de tu auto, decodificamos la cerradura y generamos una
              llave nueva desde cero con su chip programado.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F6F7F5] flex items-center justify-center text-[#12161B]">
              <Layers className="w-5 h-5 text-[#1E9E57]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12161B]">
              Cambio de carcasas y botoneras
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Renueva carcasas rotas, desgastadas o botones perforados sin necesidad de pagar por una
              llave completa nueva.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F6F7F5] flex items-center justify-center text-[#12161B]">
              <Battery className="w-5 h-5 text-[#1E9E57]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12161B]">
              Fundas de silicón y cambio de baterías
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Protección contra caídas y golpes con fundas a la medida, y reemplazo de pilas de litio
              de larga duración para tus mandos.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F6F7F5] flex items-center justify-center text-[#12161B]">
              <ShieldCheck className="w-5 h-5 text-[#1E9E57]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12161B]">
              Reparación de controles y mandos
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Diagnóstico de circuitos electrónicos desoldados, switch dañados y fallas de emisión de
              frecuencia.
            </p>
          </div>

          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 space-y-3">
            <div className="w-10 h-10 rounded-lg bg-[#F6F7F5] flex items-center justify-center text-[#12161B]">
              <Building className="w-5 h-5 text-[#1E9E57]" />
            </div>
            <h3 className="font-heading font-bold text-lg text-[#12161B]">
              Servicio especial a flotillas
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
              Atención prioritaria, facturación y tarifas corporativas para empresas con flotillas de
              reparto, utilitarios o ejecutivos.
            </p>
          </div>
        </div>
      </section>

      {/* Sección flotillas destacada */}
      <section className="bg-[#12161B] text-white rounded-2xl p-6 sm:p-10">
        <div className="max-w-3xl space-y-4">
          <span className="text-xs font-semibold text-[#1E9E57] uppercase tracking-wider">
            Para empresas y administradores de flotillas
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white">
            Servicio especial para empresas con flotillas
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            Entendemos que un vehículo detenido por falta de llave representa pérdidas de tiempo y dinero.
            Ofrecemos duplicados programados en lote, respuesta ágil ante extravíos y asesoría técnica.
          </p>

          <div className="pt-3">
            <a
              href={getFleetQuoteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[52px] px-6 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Cotizar para mi flota</span>
            </a>
          </div>
        </div>
      </section>

      {/* Cotizador integrado para Llaves de Auto */}
      <section className="max-w-3xl mx-auto space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold font-heading text-[#12161B]">
            Cotiza la llave de tu vehículo
          </h2>
          <p className="text-xs sm:text-sm text-[#5B6772] mt-1">
            Indica marca, submarca y año de tu auto para recibir costos exactos de inmediato.
          </p>
        </div>

        <CotizadorForm initialService="auto" />
      </section>
    </div>
  );
};
