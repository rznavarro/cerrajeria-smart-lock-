import React, { useState, useEffect } from 'react';
import { SMART_LOCK_MODELS } from '../data/models';
import { SmartLockModel, OpeningMode, LockUsage, AppType } from '../types';
import { getModelQuoteUrl } from '../utils/whatsapp';
import { ComparatorModal } from '../components/ComparatorModal';
import {
  MessageSquare,
  ArrowRight,
  Filter,
  Check,
  Scale,
  ShieldCheck,
  RotateCcw,
  SlidersHorizontal,
} from 'lucide-react';

interface CatalogProps {
  onNavigate: (path: string) => void;
  initialUsageFilter?: LockUsage | null;
}

export const Catalog: React.FC<CatalogProps> = ({
  onNavigate,
  initialUsageFilter = null,
}) => {
  // Filtros interactivos
  const [selectedModes, setSelectedModes] = useState<OpeningMode[]>([]);
  const [selectedUsage, setSelectedUsage] = useState<LockUsage | 'all'>(
    initialUsageFilter || 'all'
  );
  const [onlyVideo, setOnlyVideo] = useState(false);
  const [onlyRemote, setOnlyRemote] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppType | 'all'>('all');

  // Comparador (hasta 3 modelos)
  const [comparedSlugs, setComparedSlugs] = useState<string[]>([]);
  const [comparatorOpen, setComparatorOpen] = useState(false);

  // Móvil: mostrar filtros en colapso
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  useEffect(() => {
    if (initialUsageFilter) {
      setSelectedUsage(initialUsageFilter);
    }
  }, [initialUsageFilter]);

  const toggleOpeningMode = (mode: OpeningMode) => {
    setSelectedModes((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const handleToggleCompare = (slug: string) => {
    setComparedSlugs((prev) => {
      if (prev.includes(slug)) {
        return prev.filter((s) => s !== slug);
      }
      if (prev.length >= 3) {
        alert('Puedes comparar un máximo de 3 modelos simultáneamente.');
        return prev;
      }
      return [...prev, slug];
    });
  };

  const resetAllFilters = () => {
    setSelectedModes([]);
    setSelectedUsage('all');
    setOnlyVideo(false);
    setOnlyRemote(false);
    setSelectedApp('all');
  };

  // Separar modelos verificados y no verificados (§9)
  const verifiedModels = SMART_LOCK_MODELS.filter((m) => m.verified);
  const unverifiedModels = SMART_LOCK_MODELS.filter((m) => !m.verified);

  // Aplicar filtros SOLO a los modelos verificados
  const filteredVerified = verifiedModels.filter((m) => {
    if (selectedUsage !== 'all' && (!m.usages || !m.usages.includes(selectedUsage))) {
      return false;
    }
    if (
      selectedModes.length > 0 &&
      !selectedModes.every((mode) => m.openingModes.includes(mode))
    ) {
      return false;
    }
    if (onlyVideo && !m.hasVideoCall) {
      return false;
    }
    if (onlyRemote && !m.hasRemoteOpening) {
      return false;
    }
    if (selectedApp !== 'all' && m.app !== selectedApp) {
      return false;
    }
    return true;
  });

  const comparedModelsList = SMART_LOCK_MODELS.filter((m) =>
    comparedSlugs.includes(m.slug)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      {/* Encabezado del catálogo */}
      <div className="max-w-3xl">
        <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#12161B] tracking-tight">
          Catálogo de cerraduras inteligentes
        </h1>
        <p className="text-sm sm:text-base text-[#5B6772] mt-2 leading-relaxed">
          Compara modelos verificados con instalación básica, programación inicial, enlace con tu app
          y 1 año de garantía directa por escrito.
        </p>
      </div>

      {/* Barra de Filtros (Desktop y Mobile) */}
      <div className="bg-white rounded-xl border border-[#12161B]/10 p-5 shadow-xs">
        {/* Toggle para móvil */}
        <div className="flex sm:hidden items-center justify-between">
          <button
            type="button"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="flex items-center gap-2 text-sm font-semibold text-[#12161B] py-1"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>{showMobileFilters ? 'Ocultar filtros' : 'Filtrar modelos verificados'}</span>
          </button>
          {(selectedModes.length > 0 ||
            selectedUsage !== 'all' ||
            onlyVideo ||
            onlyRemote ||
            selectedApp !== 'all') && (
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#5B6772] hover:text-[#12161B]"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Contenido de filtros */}
        <div className={`mt-3 sm:mt-0 ${showMobileFilters ? 'block' : 'hidden sm:block'} space-y-5`}>
          {/* Fila 1: Uso y Aplicación */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#12161B] uppercase tracking-wider mb-1.5">
                Uso recomendado
              </label>
              <select
                value={selectedUsage}
                onChange={(e) => setSelectedUsage(e.target.value as LockUsage | 'all')}
                className="w-full px-3 py-2 bg-[#F6F7F5] border border-[#12161B]/15 rounded-[10px] text-xs font-medium text-[#12161B] outline-hidden"
              >
                <option value="all">Todos los usos</option>
                <option value="casa">Casa o departamento</option>
                <option value="renta">Renta vacacional (Airbnb)</option>
                <option value="oficina">Oficina o comercio</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#12161B] uppercase tracking-wider mb-1.5">
                Aplicación compatible
              </label>
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value as AppType | 'all')}
                className="w-full px-3 py-2 bg-[#F6F7F5] border border-[#12161B]/15 rounded-[10px] text-xs font-medium text-[#12161B] outline-hidden"
              >
                <option value="all">Todas las apps</option>
                <option value="Tuya / Smart Life">Tuya / Smart Life</option>
                <option value="TTLock">TTLock (Rentas vacacionales)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#12161B] uppercase tracking-wider mb-1.5">
                Videollamada al timbre
              </label>
              <button
                type="button"
                onClick={() => setOnlyVideo(!onlyVideo)}
                className={`w-full px-3 py-2 border rounded-[10px] text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                  onlyVideo
                    ? 'bg-[#12161B] text-white border-[#12161B]'
                    : 'bg-[#F6F7F5] text-[#12161B] border-[#12161B]/15'
                }`}
              >
                <span>Solo con pantalla y video</span>
                {onlyVideo && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#12161B] uppercase tracking-wider mb-1.5">
                Apertura remota
              </label>
              <button
                type="button"
                onClick={() => setOnlyRemote(!onlyRemote)}
                className={`w-full px-3 py-2 border rounded-[10px] text-xs font-medium flex items-center justify-between cursor-pointer transition-colors ${
                  onlyRemote
                    ? 'bg-[#12161B] text-white border-[#12161B]'
                    : 'bg-[#F6F7F5] text-[#12161B] border-[#12161B]/15'
                }`}
              >
                <span>Wi-Fi directo incluido</span>
                {onlyRemote && <Check className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Fila 2: Formas de apertura (chips interactivos) */}
          <div className="pt-3 border-t border-[#12161B]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-[#12161B] mr-1">
                Formas de abrir:
              </span>
              {[
                { id: 'rostro', label: 'Rostro 3D' },
                { id: 'huella', label: 'Huella' },
                { id: 'codigo', label: 'Código' },
                { id: 'tarjeta', label: 'Tarjeta' },
                { id: 'app', label: 'App móvil' },
              ].map((mode) => {
                const isSelected = selectedModes.includes(mode.id as OpeningMode);
                return (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => toggleOpeningMode(mode.id as OpeningMode)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#12161B] text-white border-[#12161B]'
                        : 'bg-white text-[#5B6772] border-[#12161B]/20 hover:text-[#12161B]'
                    }`}
                  >
                    {mode.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={resetAllFilters}
              className="inline-flex items-center gap-1 text-xs text-[#5B6772] hover:text-[#12161B] cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restablecer filtros</span>
            </button>
          </div>
        </div>
      </div>

      {/* SECCIÓN 1: MODELOS VERIFICADOS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#12161B]/10 pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-heading text-[#12161B]">
              Modelos con ficha técnica verificada ({filteredVerified.length})
            </h2>
            <p className="text-xs text-[#5B6772]">
              Especificaciones comprobadas, fotos reales y componentes incluidos.
            </p>
          </div>

          {comparedSlugs.length > 0 && (
            <button
              type="button"
              onClick={() => setComparatorOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#12161B] text-white text-xs font-semibold rounded-[10px] shadow-sm hover:bg-black/80 cursor-pointer"
            >
              <Scale className="w-4 h-4 text-[#1E9E57]" />
              <span>Ver comparador ({comparedSlugs.length}/3)</span>
            </button>
          )}
        </div>

        {filteredVerified.length === 0 ? (
          <div className="p-8 bg-white rounded-xl border border-[#12161B]/10 text-center space-y-3">
            <p className="text-sm text-[#5B6772]">
              No hay modelos verificados que cumplan todos los filtros seleccionados simultáneamente.
            </p>
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-[#12161B] underline"
            >
              Limpiar filtros para ver todos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredVerified.map((model) => {
              const isCompared = comparedSlugs.includes(model.slug);
              return (
                <article
                  key={model.slug}
                  className="bg-white rounded-xl border border-[#12161B]/10 overflow-hidden flex flex-col justify-between hover:border-[#12161B]/30 transition-all shadow-xs group"
                >
                  <div>
                    {/* Imagen del modelo */}
                    <div className="relative aspect-4/3 bg-black/5 overflow-hidden">
                      {model.image ? (
                        <img
                          src={model.image}
                          alt={`Cerradura Inteligente ${model.displayName}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-xs text-[#5B6772]">
                          Sin fotografía
                        </div>
                      )}
                      <div className="absolute top-3 left-3 bg-[#12161B]/90 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-md">
                        {model.displayName}
                      </div>
                    </div>

                    <div className="p-5 space-y-3">
                      {/* Zero-Pill Metadata (§1.A Anti-slop) */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#5B6772]">
                        {model.app && <span>{model.app}</span>}
                        {model.ipRating && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>{model.ipRating}</span>
                          </>
                        )}
                        {model.hasVideoCall && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span>Video</span>
                          </>
                        )}
                        <span aria-hidden="true">·</span>
                        <span className="text-[#1E9E57] font-medium">Garantía 1 año</span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-[#12161B]">
                        {model.displayName}
                      </h3>

                      <p className="text-xs text-[#5B6772] line-clamp-3 leading-relaxed">
                        {model.shortDescription}
                      </p>

                      {/* Modos de apertura verificados */}
                      <div className="pt-2 border-t border-[#12161B]/10">
                        <span className="text-[11px] font-semibold text-[#12161B] block mb-1">
                          Apertura ({model.openingModes.length} modos):
                        </span>
                        <div className="text-xs text-[#5B6772] capitalize">
                          {model.openingModes.join(', ')}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Acciones de la tarjeta */}
                  <div className="p-5 pt-0 space-y-2">
                    {/* Botón comparar */}
                    <button
                      type="button"
                      onClick={() => handleToggleCompare(model.slug)}
                      className={`w-full py-2 px-3 text-xs font-medium rounded-lg border flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                        isCompared
                          ? 'bg-[#12161B] text-white border-[#12161B]'
                          : 'bg-white text-[#5B6772] border-[#12161B]/15 hover:border-[#12161B]'
                      }`}
                    >
                      <Scale className="w-3.5 h-3.5" />
                      <span>
                        {isCompared ? 'Seleccionada en comparador' : 'Agregar al comparador'}
                      </span>
                    </button>

                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => onNavigate(`/cerraduras-inteligentes/${model.slug}`)}
                        className="py-2.5 px-3 border border-[#12161B] text-[#12161B] hover:bg-black/5 text-xs font-semibold rounded-[10px] text-center transition-colors cursor-pointer"
                      >
                        Ver ficha
                      </button>

                      <a
                        href={getModelQuoteUrl(model.code, 'tarjeta_catalogo')}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#1E9E57] hover:bg-[#17804A] text-white text-xs font-semibold rounded-[10px] shadow-xs transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Cotizar</span>
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* SECCIÓN 2: MODELOS SIN FICHA VERIFICADA (§9 & §10) */}
      <section className="pt-8 border-t border-[#12161B]/10 space-y-4">
        <div>
          <h2 className="text-xl font-bold font-heading text-[#12161B]">
            Otros modelos del catálogo ({unverifiedModels.length})
          </h2>
          <p className="text-xs text-[#5B6772]">
            Modelos disponibles en inventario cuyas especificaciones técnicas detalladas no están
            digitalizadas. Pide la ficha técnica directamente por WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {unverifiedModels.map((m) => (
            <div
              key={m.slug}
              className="bg-white rounded-lg border border-[#12161B]/10 p-3.5 flex flex-col justify-between hover:border-[#12161B]/30 transition-all text-center space-y-2"
            >
              <div>
                <span className="text-[10px] text-[#5B6772] uppercase block">Catálogo</span>
                <h4 className="font-heading font-bold text-sm text-[#12161B]">
                  {m.displayName}
                </h4>
                <div className="text-[10px] text-[#1E9E57] font-medium mt-1">
                  Garantía 1 año
                </div>
              </div>

              <div className="pt-2 border-t border-[#12161B]/10 space-y-1.5">
                <button
                  type="button"
                  onClick={() => onNavigate(`/cerraduras-inteligentes/${m.slug}`)}
                  className="text-[11px] text-[#12161B] hover:underline block w-full py-1"
                >
                  Ver ficha
                </button>
                <a
                  href={getModelQuoteUrl(m.code, 'catalogo_no_verificado')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block py-1.5 px-2 bg-[#1E9E57] hover:bg-[#17804A] text-white text-[11px] font-semibold rounded-md transition-colors"
                >
                  Cotizar
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Modal Comparador */}
      {comparatorOpen && (
        <ComparatorModal
          models={comparedModelsList}
          onRemoveModel={(slug) =>
            setComparedSlugs((prev) => prev.filter((s) => s !== slug))
          }
          onClose={() => setComparatorOpen(false)}
          onViewModel={(slug) => {
            setComparatorOpen(false);
            onNavigate(`/cerraduras-inteligentes/${slug}`);
          }}
        />
      )}
    </div>
  );
};
