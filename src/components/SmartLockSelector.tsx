import React, { useState } from 'react';
import { SMART_LOCK_MODELS } from '../data/models';
import { SmartLockModel, OpeningMode, LockUsage } from '../types';
import { getModelQuoteUrl } from '../utils/whatsapp';
import { Check, ShieldCheck, ArrowRight, MessageSquare, RotateCcw } from 'lucide-react';

interface SelectorProps {
  onSelectModel?: (slug: string) => void;
}

export const SmartLockSelector: React.FC<SelectorProps> = ({ onSelectModel }) => {
  // Pregunta 1: ¿Para qué es?
  const [usage, setUsage] = useState<LockUsage>('casa');

  // Pregunta 2: ¿Cómo quieres abrir? (Múltiples)
  const [selectedModes, setSelectedModes] = useState<OpeningMode[]>(['huella']);

  // Pregunta 3: ¿Quieres ver quién toca (videollamada)?
  const [needVideoCall, setNeedVideoCall] = useState<boolean | null>(false);

  // Pregunta 4: ¿Abrir desde otra ciudad (apertura remota)?
  const [needRemote, setNeedRemote] = useState<boolean | null>(false);

  const toggleMode = (mode: OpeningMode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  // Solo modelos verificados (§8.3 & §10)
  const verifiedModels = SMART_LOCK_MODELS.filter((m) => m.verified);

  // Filtrado estricto
  const filtered = verifiedModels.filter((m) => {
    // 1. Uso
    if (usage && m.usages && !m.usages.includes(usage)) {
      return false;
    }

    // 2. Modos de apertura seleccionados (el modelo debe soportar al menos todos los seleccionados)
    if (selectedModes.length > 0) {
      const hasAllModes = selectedModes.every((mode) =>
        m.openingModes.includes(mode)
      );
      if (!hasAllModes) return false;
    }

    // 3. Videollamada
    if (needVideoCall === true && !m.hasVideoCall) {
      return false;
    }

    // 4. Apertura remota nativa
    if (needRemote === true && !m.hasRemoteOpening) {
      return false;
    }

    return true;
  });

  // Si no hay coincidencias exactas, mostrar los modelos verificados más recomendados para ese uso
  const resultsToShow =
    filtered.length > 0
      ? filtered
      : verifiedModels.filter((m) => m.usages?.includes(usage));

  const resetFilters = () => {
    setUsage('casa');
    setSelectedModes(['huella']);
    setNeedVideoCall(false);
    setNeedRemote(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#12161B]/10 p-6 sm:p-10 shadow-sm">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#12161B]">
          ¿Cuál cerradura me conviene?
        </h2>
        <p className="text-sm sm:text-base text-[#5B6772] mt-2">
          Responde 4 preguntas y encuentra el modelo exacto para tu tipo de puerta y necesidades.
        </p>
      </div>

      <div className="space-y-7">
        {/* Pregunta 1 */}
        <div>
          <span className="block text-sm font-bold text-[#12161B] mb-3">
            1. ¿Para qué es la cerradura?
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'casa', label: 'Casa o departamento', sub: 'Seguridad familiar y visitas' },
              { id: 'renta', label: 'Renta vacacional', sub: 'Códigos temporales con TTLock' },
              { id: 'oficina', label: 'Oficina o negocio', sub: 'Control de accesos y personal' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setUsage(item.id as LockUsage)}
                className={`p-4 rounded-[10px] text-left border-2 transition-all cursor-pointer ${
                  usage === item.id
                    ? 'border-[#12161B] bg-[#12161B] text-white shadow-sm'
                    : 'border-[#12161B]/15 bg-white text-[#12161B] hover:border-[#12161B]'
                }`}
              >
                <div className="font-semibold text-sm">{item.label}</div>
                <div
                  className={`text-xs mt-1 ${
                    usage === item.id ? 'text-white/80' : 'text-[#5B6772]'
                  }`}
                >
                  {item.sub}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Pregunta 2 */}
        <div>
          <span className="block text-sm font-bold text-[#12161B] mb-2">
            2. ¿Cómo quieres abrir? (Puedes elegir varias)
          </span>
          <div className="flex flex-wrap gap-2.5">
            {[
              { id: 'huella', label: 'Huella dactilar' },
              { id: 'rostro', label: 'Rostro 3D' },
              { id: 'codigo', label: 'Código numérico' },
              { id: 'app', label: 'App móvil' },
              { id: 'tarjeta', label: 'Tarjeta RFID' },
              { id: 'llave', label: 'Llave mecánica' },
            ].map((mode) => {
              const isSelected = selectedModes.includes(mode.id as OpeningMode);
              return (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => toggleMode(mode.id as OpeningMode)}
                  className={`px-4 py-2.5 rounded-[10px] text-sm font-medium border transition-colors flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-[#12161B] text-white border-[#12161B]'
                      : 'bg-white text-[#12161B] border-[#12161B]/20 hover:border-[#12161B]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded flex items-center justify-center text-xs ${
                      isSelected ? 'bg-white text-[#12161B]' : 'border border-[#12161B]/30'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                  <span>{mode.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pregunta 3 & 4 en 2 columnas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
          {/* Pregunta 3: Videollamada */}
          <div>
            <span className="block text-sm font-bold text-[#12161B] mb-2">
              3. ¿Quieres ver quién toca (videollamada)?
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNeedVideoCall(true)}
                className={`py-3 px-4 rounded-[10px] text-sm font-medium border text-center transition-colors cursor-pointer ${
                  needVideoCall === true
                    ? 'bg-[#12161B] text-white border-[#12161B]'
                    : 'bg-white text-[#12161B] border-[#12161B]/20 hover:border-[#12161B]'
                }`}
              >
                Sí, con pantalla y cámara
              </button>
              <button
                type="button"
                onClick={() => setNeedVideoCall(false)}
                className={`py-3 px-4 rounded-[10px] text-sm font-medium border text-center transition-colors cursor-pointer ${
                  needVideoCall === false
                    ? 'bg-[#12161B] text-white border-[#12161B]'
                    : 'bg-white text-[#12161B] border-[#12161B]/20 hover:border-[#12161B]'
                }`}
              >
                No es indispensable
              </button>
            </div>
          </div>

          {/* Pregunta 4: Apertura remota */}
          <div>
            <span className="block text-sm font-bold text-[#12161B] mb-2">
              4. ¿Abrir desde otra ciudad (apertura remota)?
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setNeedRemote(true)}
                className={`py-3 px-4 rounded-[10px] text-sm font-medium border text-center transition-colors cursor-pointer ${
                  needRemote === true
                    ? 'bg-[#12161B] text-white border-[#12161B]'
                    : 'bg-white text-[#12161B] border-[#12161B]/20 hover:border-[#12161B]'
                }`}
              >
                Sí, Wi-Fi directo
              </button>
              <button
                type="button"
                onClick={() => setNeedRemote(false)}
                className={`py-3 px-4 rounded-[10px] text-sm font-medium border text-center transition-colors cursor-pointer ${
                  needRemote === false
                    ? 'bg-[#12161B] text-white border-[#12161B]'
                    : 'bg-white text-[#12161B] border-[#12161B]/20 hover:border-[#12161B]'
                }`}
              >
                No es indispensable
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Resultados filtrados */}
      <div className="mt-10 pt-8 border-t border-[#12161B]/10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
          <div>
            <h3 className="text-lg font-bold font-heading text-[#12161B]">
              {filtered.length > 0
                ? `${filtered.length} modelo(s) recomendado(s) para tu búsqueda`
                : 'Modelos recomendados con alta compatibilidad'}
            </h3>
            {filtered.length === 0 && (
              <p className="text-xs text-[#5B6772] mt-0.5">
                No hubo coincidencia 100% exacta con todos los filtros combinados; aquí tienes las mejores opciones verificadas:
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-[#5B6772] hover:text-[#12161B] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar selector</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {resultsToShow.map((model) => (
            <div
              key={model.slug}
              className="flex flex-col bg-[#F6F7F5] rounded-xl border border-[#12161B]/10 p-5 hover:border-[#12161B]/30 transition-all group"
            >
              {model.image ? (
                <div className="relative aspect-4/3 rounded-lg overflow-hidden bg-black/5 mb-4">
                  <img
                    src={model.image}
                    alt={`Cerradura Inteligente ${model.displayName}`}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                  />
                </div>
              ) : (
                <div className="aspect-4/3 rounded-lg bg-black/5 flex items-center justify-center text-[#5B6772] text-xs mb-4">
                  Foto en catálogo
                </div>
              )}

              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-[#5B6772]">
                    Código verificado
                  </span>
                  <span className="text-xs text-[#1E9E57] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Garantía 1 año
                  </span>
                </div>
                <h4 className="text-xl font-bold font-heading text-[#12161B]">
                  {model.displayName}
                </h4>
                <p className="text-xs text-[#5B6772] mt-2 line-clamp-2">
                  {model.shortDescription}
                </p>

                {/* Unboxed Metadata (Zero-pill discipline) */}
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5B6772] mt-3 pt-3 border-t border-[#12161B]/10">
                  {model.app && <span>App: {model.app}</span>}
                  {model.ipRating && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>{model.ipRating}</span>
                    </>
                  )}
                  {model.hasVideoCall && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>Videollamada</span>
                    </>
                  )}
                </div>
              </div>

              {/* Botones de acción */}
              <div className="mt-5 pt-3 border-t border-[#12161B]/10 flex flex-col gap-2">
                <a
                  href={getModelQuoteUrl(model.code, 'selector_recomendacion')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 h-11 bg-[#1E9E57] hover:bg-[#17804A] text-white text-xs font-semibold rounded-[10px] shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cotizar este modelo</span>
                </a>

                {onSelectModel && (
                  <button
                    type="button"
                    onClick={() => onSelectModel(model.slug)}
                    className="w-full flex items-center justify-center gap-1 py-2 text-xs font-medium text-[#12161B] hover:underline cursor-pointer"
                  >
                    <span>Ver ficha técnica detallada</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
