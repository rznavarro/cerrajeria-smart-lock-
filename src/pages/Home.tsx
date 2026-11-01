import React, { useState } from 'react';
import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';
import { SMART_LOCK_MODELS } from '../data/models';
import {
  buildWhatsAppUrl,
  getVacationRentalQuoteUrl,
  getCarKeyQuoteUrl,
  getTechServiceQuoteUrl,
  getModelQuoteUrl,
} from '../utils/whatsapp';
import { SmartLockSelector } from '../components/SmartLockSelector';
import { CotizadorForm } from '../components/CotizadorForm';
import { ReviewsSection } from '../components/ReviewsSection';
import {
  MessageSquare,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Smartphone,
  PhoneCall,
  Sparkles,
  KeyRound,
  Home as HomeIcon,
  Car,
  ChevronDown,
  Building,
  Check,
  Layers,
  MapPin,
  Phone,
  Mail,
} from 'lucide-react';

interface HomeProps {
  onNavigate: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePrimaryHeroWhatsApp = () => {
    trackAnalyticsEvent('clic_whatsapp', { context: 'hero_principal' });
    const msg =
      'Hola, quiero cotizar mi cerradura inteligente con instalación y garantía por escrito.';
    window.open(buildWhatsAppUrl(msg), '_blank', 'noopener,noreferrer');
  };

  // Modelos destacados para rentas vacacionales (K8 y Q5)
  const vacationModels = SMART_LOCK_MODELS.filter(
    (m) => m.slug === 'k8' || m.slug === 'q5'
  );

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 8.1 HERO SECTION */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:pt-12 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Texto y CTAs */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#12161B] bg-black/5 px-3 py-1.5 rounded-md">
                <ShieldCheck className="w-4 h-4 text-[#1E9E57]" />
                <span>Instalación básica y soporte técnico de 1 año incluidos</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold font-heading text-[#12161B] tracking-tight leading-[1.15] text-balance">
                Cerraduras inteligentes instaladas, programadas y con garantía por escrito
              </h1>

              <p className="text-base sm:text-lg text-[#5B6772] max-w-2xl leading-relaxed">
                Elige tu modelo y nosotros lo instalamos, lo enlazamos a tu app y te enseñamos a
                usarlo. Incluye un año de soporte técnico por teléfono.
              </p>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={handlePrimaryHeroWhatsApp}
                  className="flex items-center justify-center gap-2 h-[52px] px-7 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-base rounded-[10px] shadow-sm transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  <span>Cotizar mi cerradura por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('/cerraduras-inteligentes')}
                  className="flex items-center justify-center gap-2 h-[52px] px-6 border-2 border-[#12161B] hover:bg-black/5 text-[#12161B] font-semibold text-sm rounded-[10px] transition-colors cursor-pointer"
                >
                  <span>Ver cerraduras</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Enlace discreto a llaves de auto */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('/llaves-automotrices')}
                  className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-[#5B6772] hover:text-[#12161B] underline underline-offset-4 cursor-pointer"
                >
                  <Car className="w-4 h-4" />
                  <span>¿Buscas llaves de auto? Cotiza aquí</span>
                </button>
              </div>
            </div>

            {/* Imagen real del catálogo */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-lg border border-[#12161B]/10 bg-white">
                <img
                  src="/src/assets/images/smart_lock_sls120_1793498227985.jpg"
                  alt="Cerradura inteligente de alta seguridad con reconocimiento facial y pantalla digital"
                  className="w-full h-auto object-cover aspect-4/3"
                />
                <div className="p-4 bg-white border-t border-[#12161B]/5 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold text-[#5B6772]">
                      Modelo en catálogo
                    </span>
                    <h3 className="font-heading font-bold text-sm text-[#12161B]">
                      Mod. SLS120 · Rostro 3D + Video
                    </h3>
                  </div>
                  <button
                    onClick={() => onNavigate('/cerraduras-inteligentes/120')}
                    className="text-xs font-semibold text-[#12161B] hover:underline"
                  >
                    Ver detalles →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.2 "¿QUÉ NECESITAS RESOLVER?" (5 tarjetas con CTA específico) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
            ¿Qué necesitas resolver?
          </h2>
          <p className="text-sm sm:text-base text-[#5B6772] mt-1">
            Soluciones especializadas en seguridad digital, cerrajería automotriz y residencial.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Tarjeta 1 */}
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between hover:border-[#12161B]/30 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#12161B]/5 flex items-center justify-center text-[#12161B]">
                <HomeIcon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#12161B]">
                Quiero una cerradura inteligente para mi casa
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
                Olvídate de cargar llaves. Abre con tu huella, rostro 3D, código o desde tu celular
                con instalación profesional garantizada.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/cerraduras-inteligentes')}
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[#12161B] pt-4 border-t border-[#12161B]/10 hover:text-[#1E9E57] cursor-pointer"
            >
              <span>Ver catálogo para casa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 2 */}
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between hover:border-[#12161B]/30 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#12161B]/5 flex items-center justify-center text-[#12161B]">
                <Smartphone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#12161B]">
                La necesito para una renta vacacional
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
                Controla entradas a distancia con la app TTLock. Genera códigos con fecha y hora de
                entrada y salida sin entregar llaves físicas.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/cerraduras-inteligentes?uso=renta')}
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[#12161B] pt-4 border-t border-[#12161B]/10 hover:text-[#1E9E57] cursor-pointer"
            >
              <span>Ver modelos para rentas</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 3 */}
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between hover:border-[#12161B]/30 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#12161B]/5 flex items-center justify-center text-[#12161B]">
                <Car className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#12161B]">
                Necesito una llave de auto
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
                Copias con chip, llaves nuevas por extravío total, cambio de carcasas rotas, baterías y
                servicio para flotillas vehiculares.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/llaves-automotrices')}
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[#12161B] pt-4 border-t border-[#12161B]/10 hover:text-[#1E9E57] cursor-pointer"
            >
              <span>Cotizar llave de auto</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 4 */}
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between hover:border-[#12161B]/30 transition-all">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#12161B]/5 flex items-center justify-center text-[#12161B]">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#12161B]">
                Mi cerradura inteligente necesita reparación o programación
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
                Servicio técnico y configuración para todas las marcas del mercado, incluyendo Yale y
                Samsung. Diagnóstico y mantenimiento especializado.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/cerrajeria-y-servicio-tecnico')}
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[#12161B] pt-4 border-t border-[#12161B]/10 hover:text-[#1E9E57] cursor-pointer"
            >
              <span>Consultar servicio técnico</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Tarjeta 5 */}
          <div className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between hover:border-[#12161B]/30 transition-all md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-[#12161B]/5 flex items-center justify-center text-[#12161B]">
                <KeyRound className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold font-heading text-[#12161B]">
                Cerrajería para casa u oficina
              </h3>
              <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed max-w-xl">
                Venta e instalación de cerraduras convencionales, cambios de combinación, hechuras de
                llaves maestras, duplicados y servicios especializados para puertas de cristal.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/cerrajeria-y-servicio-tecnico')}
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[#12161B] pt-4 border-t border-[#12161B]/10 hover:text-[#1E9E57] cursor-pointer"
            >
              <span>Ver servicios residenciales y comerciales</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 8.3 SELECTOR INTERACTIVO "¿CUÁL CERRADURA ME CONVIENE?" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SmartLockSelector
          onSelectModel={(slug) => onNavigate(`/cerraduras-inteligentes/${slug}`)}
        />
      </section>

      {/* 8.4 "QUÉ INCLUYE TU COMPRA" */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#12161B]/10 p-6 sm:p-10">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
              Qué incluye tu compra
            </h2>
            <p className="text-sm sm:text-base text-[#5B6772] mt-2">
              A diferencia de comprar en internet sin respaldo, con nosotros tu cerradura queda lista
              para usarse desde el primer día.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#12161B] border border-[#12161B]/10">
                <Wrench className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#12161B]">
                1. Instalación básica
              </h3>
              <p className="text-xs text-[#5B6772] leading-relaxed">
                Perforación y montaje exacto del mecanismo en tu puerta para un encaje suave y seguro.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#12161B] border border-[#12161B]/10">
                <Sparkles className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#12161B]">
                2. Programación inicial
              </h3>
              <p className="text-xs text-[#5B6772] leading-relaxed">
                Alta de usuarios administradores, contraseñas maestras y registro de huellas o tarjetas.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#12161B] border border-[#12161B]/10">
                <Smartphone className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#12161B]">
                3. Enlace con tu aplicación
              </h3>
              <p className="text-xs text-[#5B6772] leading-relaxed">
                Conexión a tu red Wi-Fi o Bluetooth con Tuya, Smart Life o TTLock en tu propio smartphone.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#12161B] border border-[#12161B]/10">
                <Check className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#12161B]">
                4. Capacitación de uso
              </h3>
              <p className="text-xs text-[#5B6772] leading-relaxed">
                Te explicamos paso a paso cómo abrir, cambiar claves y resolver emergencias con tu llave física.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#12161B] border border-[#12161B]/10">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#12161B]">
                5. Garantía directa por escrito
              </h3>
              <p className="text-xs text-[#5B6772] leading-relaxed">
                1 año de garantía directa con nosotros. Conserva cerradura completa, llaves y comprobante.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#F6F7F5] border border-[#12161B]/5 space-y-2">
              <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center text-[#12161B] border border-[#12161B]/10">
                <PhoneCall className="w-4 h-4" />
              </div>
              <h3 className="font-heading font-bold text-base text-[#12161B]">
                6. 1 año de soporte telefónico
              </h3>
              <p className="text-xs text-[#5B6772] leading-relaxed">
                Asistencia directa por llamada o WhatsApp si tienes dudas sobre la app o la configuración.
              </p>
            </div>
          </div>

          {/* Letra chica y notas visibles */}
          <div className="mt-8 pt-6 border-t border-[#12161B]/10 space-y-2 text-xs text-[#5B6772]">
            <p>
              <strong className="text-[#12161B]">Condición de instalación básica:</strong>{' '}
              {SITE_CONFIG.basicInstallationNotice}
            </p>
            <p>
              <strong className="text-[#12161B]">Nota por modelo:</strong> La ficha del modelo 313
              indica además resanes básicos en madera (no incluye terminado al color).
            </p>
          </div>
        </div>
      </section>

      {/* 8.5 RENTAS VACACIONALES (TTLock: K8, Q5) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#12161B] text-white rounded-2xl p-6 sm:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="text-xs font-semibold text-[#1E9E57] uppercase tracking-wider">
                Especial para anfitriones de Airbnb y rentas
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold font-heading text-white leading-snug">
                Dale acceso a tus huéspedes sin entregar llaves
              </h2>
              <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                Con cerraduras compatibles con la app <strong>TTLock</strong>, administra los accesos
                de tus propiedades de forma profesional:
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-white/90">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E9E57] shrink-0 mt-0.5" />
                  <span>
                    <strong>Códigos con vigencia exacta:</strong> programa fecha y hora de inicio
                    (check-in) y vencimiento (check-out).
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E9E57] shrink-0 mt-0.5" />
                  <span>
                    <strong>Códigos de un solo uso o cíclicos:</strong> ideales para personal de
                    limpieza o mantenimiento recurrente.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E9E57] shrink-0 mt-0.5" />
                  <span>
                    <strong>Envío inmediato:</strong> comparte el código a tu huésped directamente por
                    WhatsApp o correo electrónico.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1E9E57] shrink-0 mt-0.5" />
                  <span>
                    <strong>Historial de accesos:</strong> registro de quién entró y a qué hora.
                  </span>
                </li>
              </ul>

              <div className="bg-white/10 p-3 rounded-lg text-xs text-white/70">
                <span className="font-semibold text-white">Aclaración técnica:</span> La apertura
                remota en tiempo real con el modelo SLK8 requiere un módulo Gateway HUB que se vende
                por separado.
              </div>

              <div className="pt-2">
                <a
                  href={getVacationRentalQuoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 h-[52px] px-6 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] transition-colors cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cotizar cerradura para mi renta</span>
                </a>
              </div>
            </div>

            {/* Tarjetas de modelos para renta */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {vacationModels.map((m) => (
                <div
                  key={m.slug}
                  className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between"
                >
                  <div>
                    {m.image && (
                      <div className="aspect-4/3 rounded-lg overflow-hidden bg-black/20 mb-3">
                        <img
                          src={m.image}
                          alt={m.displayName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <h3 className="font-heading font-bold text-base text-white">{m.displayName}</h3>
                    <p className="text-xs text-white/70 mt-1 line-clamp-3">
                      {m.shortDescription}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate(`/cerraduras-inteligentes/${m.slug}`)}
                    className="mt-4 text-xs font-semibold text-[#1E9E57] hover:underline flex items-center justify-between"
                  >
                    <span>Ver ficha técnica</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8.6 LLAVES AUTOMOTRICES (Resumen) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#12161B]/10 p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-semibold text-[#5B6772] uppercase tracking-wider">
                Cerrajería automotriz profesional
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
                Llaves automotrices con chip, carcasas y servicio a flotillas
              </h2>
              <p className="text-sm text-[#5B6772] leading-relaxed">
                Programación de llaves para la mayoría de marcas y modelos del parque vehicular.
                Soluciones rápidas tanto para particulares como para empresas con flotillas.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-[#F6F7F5] rounded-lg font-medium text-[#12161B]">
                  · Copias y duplicados
                </div>
                <div className="p-3 bg-[#F6F7F5] rounded-lg font-medium text-[#12161B]">
                  · Llaves nuevas por pérdida
                </div>
                <div className="p-3 bg-[#F6F7F5] rounded-lg font-medium text-[#12161B]">
                  · Cambio de carcasas
                </div>
                <div className="p-3 bg-[#F6F7F5] rounded-lg font-medium text-[#12161B]">
                  · Reparación de controles
                </div>
                <div className="p-3 bg-[#F6F7F5] rounded-lg font-medium text-[#12161B]">
                  · Fundas de silicón
                </div>
                <div className="p-3 bg-[#F6F7F5] rounded-lg font-medium text-[#12161B]">
                  · Cambio de baterías
                </div>
              </div>

              <div className="p-3.5 bg-black/5 rounded-lg text-xs text-[#12161B] font-medium flex items-center gap-2">
                <Building className="w-4 h-4 text-[#12161B]" />
                <span>Servicio especial y condiciones preferenciales para empresas con flotillas.</span>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <a
                  href={getCarKeyQuoteUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-[52px] px-6 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cotizar la llave de mi auto</span>
                </a>
                <button
                  onClick={() => onNavigate('/llaves-automotrices')}
                  className="inline-flex items-center justify-center gap-2 h-[52px] px-5 border-2 border-[#12161B] text-[#12161B] font-semibold text-sm rounded-[10px] hover:bg-black/5"
                >
                  <span>Ver servicios automotrices</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-xl overflow-hidden border border-[#12161B]/10 aspect-4/3 bg-black/5">
                <img
                  src="/src/assets/images/car_key_service_1793498230210.jpg"
                  alt="Herramientas profesionales y llaves automotrices con chip"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8.7 SERVICIO TÉCNICO MULTIMARCA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F6F7F5] border border-[#12161B]/15 rounded-2xl p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-semibold text-[#5B6772] uppercase tracking-wider">
              Diagnóstico y mantenimiento multimarca
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
              Servicio técnico para todas las marcas, como Yale y Samsung
            </h2>
            <p className="text-sm text-[#5B6772]">
              ¿Tu cerradura inteligente dejó de leer huellas, no traba o perdiste la clave de
              administrador? Nuestro equipo especializado diagnostica, reconfigura o repara tu equipo.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={getTechServiceQuoteUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-[52px] px-6 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] shadow-sm transition-colors whitespace-nowrap"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consultar por WhatsApp</span>
            </a>
          </div>
        </div>
      </section>

      {/* 8.8 SUCURSALES (Solo datos verificados; oculta campos vacíos) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
            Nuestras sucursales
          </h2>
          <p className="text-sm text-[#5B6772] mt-1">
            Atención personalizada para cotizaciones, programación de llaves e instalaciones.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SITE_CONFIG.branches.map((branch) => (
            <div
              key={branch.slug}
              className="bg-white rounded-xl border border-[#12161B]/10 p-6 flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center gap-2 text-[#12161B]">
                  <MapPin className="w-5 h-5 text-[#1E9E57]" />
                  <h3 className="font-heading font-bold text-xl text-[#12161B]">
                    {branch.name}
                  </h3>
                </div>

                {branch.address ? (
                  <p className="text-sm text-[#5B6772] mt-3">{branch.address}</p>
                ) : (
                  <p className="text-sm text-[#5B6772] mt-3">
                    Escríbenos y te decimos cuál sucursal te queda más cerca.
                  </p>
                )}

                {branch.hours && (
                  <p className="text-xs text-[#5B6772] mt-1">Horario: {branch.hours}</p>
                )}
              </div>

              <div className="pt-4 border-t border-[#12161B]/10 grid grid-cols-2 gap-2">
                <a
                  href={buildWhatsAppUrl(
                    `Hola, me gustaría saber la ubicación y horarios de la ${branch.name}.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 h-11 bg-[#1E9E57] hover:bg-[#17804A] text-white text-xs font-semibold rounded-[10px] transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.phoneCallable}`}
                  className="flex items-center justify-center gap-1.5 h-11 border-2 border-[#12161B] text-[#12161B] hover:bg-black/5 text-xs font-semibold rounded-[10px] transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Llamar</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8.9 RESEÑAS (Se oculta por defecto si no hay reseñas reales comprobadas) */}
      <ReviewsSection />

      {/* 8.10 PREGUNTAS FRECUENTES (Solo con datos comprobados del documento) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
            Preguntas frecuentes
          </h2>
          <p className="text-sm text-[#5B6772] mt-1">
            Respuestas directas con especificaciones y requerimientos técnicos reales.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              q: '¿Funciona en mi puerta?',
              a: 'Es compatible con puertas abatibles de 4 a 15 cm de grosor, ya sean de madera, metal, aluminio o cualquier material perforable. Para puertas con diseño especial o metálicas la instalación puede tener un costo adicional.',
            },
            {
              q: '¿Necesito Wi-Fi para que funcione?',
              a: 'Los modelos 120, V8, C22 y Q5 tienen Wi-Fi integrado, el cual opera exclusivamente en redes 2.4 GHz y no es compatible con conexiones satelitales Starlink. Por su parte, el modelo SLK8 funciona mediante Bluetooth; para abrir a distancia desde otra ciudad requiere un módulo Gateway HUB que se vende por separado.',
            },
            {
              q: '¿Qué aplicación móvil utiliza cada modelo?',
              a: 'Los modelos SLS120, SLV8 y SLC22 se administran mediante las aplicaciones Tuya o Smart Life. Los modelos SLK8 y Q5 utilizan la app TTLock, especializada en rentas vacacionales.',
            },
            {
              q: '¿Cuánto dura la batería y cómo se recarga?',
              a: 'Los modelos SLS120, SLV8 y SLC22 cuentan con batería de litio recargable de 7.4 V (4200 mAh) mediante puerto USB-C, con una duración aproximada de 3 a 5 meses. Los modelos SLK8 y Q5 utilizan 4 pilas AA alcalinas con duración aproximada de hasta 4 meses (se especifica no utilizar pilas recargables).',
            },
            {
              q: '¿Qué garantía tienen las cerraduras?',
              a: 'Cuentan con un año de garantía directa con nosotros por escrito. Para hacerla válida se requiere presentar la cerradura completa con todos sus accesorios, el juego de llaves mecánicas y el ticket de compra.',
            },
            {
              q: '¿Reparan cerraduras inteligentes de otras marcas?',
              a: 'Sí, contamos con servicio técnico para todas las marcas del mercado, incluyendo marcas como Yale y Samsung.',
            },
          ].map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#12161B]/10 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-[#12161B] hover:bg-black/2 cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#5B6772] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-[#5B6772] leading-relaxed border-t border-[#12161B]/5 pt-3 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 8.11 CIERRE & COTIZADOR */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
            ¿No sabes cuál elegir? Cuéntanos de tu puerta y te recomendamos
          </h2>
          <p className="text-sm text-[#5B6772] mt-2">
            Llena los datos a continuación o comunícate directamente con nuestros técnicos.
          </p>
        </div>

        <CotizadorForm />

        {/* Contacto telefónico y correo de respaldo */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[#5B6772]">
          <a
            href={`tel:${SITE_CONFIG.phoneCallable}`}
            className="flex items-center gap-2 hover:text-[#12161B]"
          >
            <Phone className="w-4 h-4 text-[#1E9E57]" />
            <span>Llamadas directas: {SITE_CONFIG.phoneDisplay}</span>
          </a>
          <span className="hidden sm:inline">·</span>
          <a
            href={`mailto:${SITE_CONFIG.email}`}
            className="flex items-center gap-2 hover:text-[#12161B]"
          >
            <Mail className="w-4 h-4 text-[#1E9E57]" />
            <span>{SITE_CONFIG.email}</span>
          </a>
        </div>
      </section>
    </div>
  );
};
