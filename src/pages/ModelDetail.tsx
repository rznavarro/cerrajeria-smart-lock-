import React from 'react';
import { SMART_LOCK_MODELS } from '../data/models';
import { SITE_CONFIG } from '../data/config';
import { getModelQuoteUrl } from '../utils/whatsapp';
import {
  ArrowLeft,
  ShieldCheck,
  Check,
  MessageSquare,
  Wrench,
  Smartphone,
  Battery,
  Wifi,
  DoorClosed,
  AlertCircle,
  FileText,
} from 'lucide-react';

interface ModelDetailProps {
  slug: string;
  onNavigate: (path: string) => void;
}

export const ModelDetail: React.FC<ModelDetailProps> = ({ slug, onNavigate }) => {
  const model = SMART_LOCK_MODELS.find(
    (m) => m.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!model) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="text-2xl font-bold font-heading text-[#12161B]">
          Modelo no encontrado
        </h1>
        <p className="text-sm text-[#5B6772]">
          El código de modelo que buscas no se encuentra en el catálogo.
        </p>
        <button
          onClick={() => onNavigate('/cerraduras-inteligentes')}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#12161B] text-white text-xs font-semibold rounded-[10px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo</span>
        </button>
      </div>
    );
  }

  const quoteUrl = getModelQuoteUrl(model.code, 'ficha_detalle');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Breadcrumb / Back button */}
      <div>
        <button
          type="button"
          onClick={() => onNavigate('/cerraduras-inteligentes')}
          className="inline-flex items-center gap-2 text-xs font-semibold text-[#5B6772] hover:text-[#12161B] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al catálogo completo</span>
        </button>
      </div>

      {/* Hero del modelo */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Imagen o Contenedor visual */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-[#12161B]/10 bg-white shadow-sm">
            {model.image ? (
              <img
                src={model.image}
                alt={`Cerradura Inteligente ${model.displayName}`}
                className="w-full h-auto object-cover aspect-4/3"
              />
            ) : (
              <div className="aspect-4/3 flex flex-col items-center justify-center p-6 text-center bg-black/5 text-[#5B6772] space-y-2">
                <FileText className="w-10 h-10 text-[#5B6772]/60" />
                <span className="text-sm font-medium">
                  Fotografía y ficha técnica en inventario
                </span>
                <span className="text-xs text-[#5B6772]/80">
                  Solicita imágenes reales del modelo por WhatsApp
                </span>
              </div>
            )}
          </div>

          {/* Garantía destacada */}
          <div className="mt-4 p-4 rounded-xl bg-white border border-[#12161B]/10 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#1E9E57] shrink-0 mt-0.5" />
            <div className="text-xs text-[#5B6772]">
              <strong className="text-[#12161B] block font-semibold mb-0.5">
                Garantía directa de 1 año por escrito
              </strong>
              {model.warranty || SITE_CONFIG.warrantyYears + ' año de garantía directa.'}
            </div>
          </div>
        </div>

        {/* Información y llamada a la acción */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#5B6772] mb-2">
              <span className="font-semibold text-[#12161B]">Código de modelo</span>
              <span aria-hidden="true">·</span>
              <span>{model.code}</span>
              <span aria-hidden="true">·</span>
              {model.verified ? (
                <span className="text-[#1E9E57] font-medium">Ficha verificada</span>
              ) : (
                <span className="text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                  Consulta por WhatsApp
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#12161B] tracking-tight">
              {model.displayName}
            </h1>

            <p className="text-sm sm:text-base text-[#5B6772] mt-3 leading-relaxed">
              {model.shortDescription}
            </p>
          </div>

          {/* CTA Principal de la ficha (§12: "Cotizar este modelo por WhatsApp") */}
          <div className="p-5 rounded-xl bg-white border border-[#12161B]/10 space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-semibold text-[#5B6772] uppercase tracking-wider">
                Precio con instalación
              </span>
              <span className="text-xs text-[#1E9E57] font-semibold">
                Cotización inmediata por WhatsApp
              </span>
            </div>
            <p className="text-xs text-[#5B6772]">
              El precio final se calcula según el material y grosor de tu puerta e incluye la
              instalación básica, enlace a tu app y 1 año de soporte.
            </p>
            <a
              href={quoteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 h-[52px] bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-base rounded-[10px] shadow-sm transition-colors cursor-pointer"
            >
              <MessageSquare className="w-5 h-5" />
              <span>Cotizar este modelo por WhatsApp</span>
            </a>
          </div>

          {/* Nota técnica especial si existe */}
          {model.specialNotes && (
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <strong className="font-semibold block mb-0.5">Nota importante:</strong>
                {model.specialNotes}
              </div>
            </div>
          )}

          {/* Especificaciones técnicas (si está verificada) */}
          {model.verified ? (
            <div className="space-y-4 pt-4 border-t border-[#12161B]/10">
              <h2 className="text-lg font-bold font-heading text-[#12161B]">
                Especificaciones técnicas
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {model.openingModes.length > 0 && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Modos de apertura:</span>
                    <strong className="text-[#12161B] capitalize font-semibold">
                      {model.openingModes.join(', ')}
                    </strong>
                  </div>
                )}

                {model.app && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">App móvil:</span>
                    <strong className="text-[#12161B] font-semibold">{model.app}</strong>
                  </div>
                )}

                {model.connection && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Conectividad:</span>
                    <strong className="text-[#12161B] font-semibold">{model.connection}</strong>
                  </div>
                )}

                {model.battery && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Batería:</span>
                    <strong className="text-[#12161B] font-semibold">{model.battery}</strong>
                  </div>
                )}

                {model.lockingType && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Mecanismo de cierre:</span>
                    <strong className="text-[#12161B] font-semibold">{model.lockingType}</strong>
                  </div>
                )}

                {model.ipRating && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Grado de protección:</span>
                    <strong className="text-[#12161B] font-semibold">{model.ipRating}</strong>
                  </div>
                )}

                {model.doorThickness && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Compatibilidad de puerta:</span>
                    <strong className="text-[#12161B] font-semibold">{model.doorThickness}</strong>
                  </div>
                )}

                {model.memory && (
                  <div className="p-3 bg-white rounded-lg border border-[#12161B]/10">
                    <span className="text-[#5B6772] block mb-1">Capacidad de memoria:</span>
                    <strong className="text-[#12161B] font-semibold">{model.memory}</strong>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* Modelo sin ficha verificada: texto honesto indicado en §10 */
            <div className="p-5 rounded-xl bg-white border border-[#12161B]/10 space-y-3">
              <h2 className="text-base font-bold font-heading text-[#12161B]">
                Ficha técnica en proceso de digitalización
              </h2>
              <p className="text-xs sm:text-sm text-[#5B6772] leading-relaxed">
                Este modelo ({model.displayName}) forma parte de nuestro catálogo activo. Para
                garantizar que recibas información 100% exacta sin suposiciones, consulta
                directamente las especificaciones, fotografías y medidas con nuestros cerrajeros vía
                WhatsApp.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Qué incluye tu compra para este modelo */}
      {model.includes && model.includes.length > 0 && (
        <section className="bg-white rounded-2xl border border-[#12161B]/10 p-6 sm:p-10">
          <div className="max-w-2xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#12161B]">
              Qué incluye tu compra con {model.displayName}
            </h2>
            <p className="text-xs sm:text-sm text-[#5B6772] mt-1">
              Todos los componentes de hardware, servicios de instalación profesional y garantía.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            {model.includes.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-2.5 p-3 rounded-lg bg-[#F6F7F5] text-[#12161B]"
              >
                <Check className="w-4 h-4 text-[#1E9E57] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Letra chica visible (§8.4) */}
          <div className="mt-6 pt-4 border-t border-[#12161B]/10 text-xs text-[#5B6772] space-y-1">
            <p className="font-semibold text-[#12161B]">Condiciones del servicio:</p>
            <p>{SITE_CONFIG.basicInstallationNotice}</p>
          </div>
        </section>
      )}

      {/* Cierre inferior de la ficha con CTA */}
      <section className="text-center bg-[#F6F7F5] rounded-2xl border border-[#12161B]/10 p-8 space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#12161B]">
          ¿Listo para equipar tu puerta con {model.displayName}?
        </h2>
        <p className="text-xs sm:text-sm text-[#5B6772] max-w-lg mx-auto">
          Escríbenos por WhatsApp con una foto o descripción de tu puerta para confirmarte
          compatibilidad inmediata.
        </p>
        <div className="pt-2">
          <a
            href={quoteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-[52px] px-8 bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-sm rounded-[10px] shadow-sm transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Cotizar este modelo por WhatsApp</span>
          </a>
        </div>
      </section>
    </div>
  );
};
