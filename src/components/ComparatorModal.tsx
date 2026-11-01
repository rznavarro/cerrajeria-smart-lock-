import React from 'react';
import { SmartLockModel } from '../types';
import { getModelQuoteUrl } from '../utils/whatsapp';
import { X, Check, ShieldCheck, MessageSquare } from 'lucide-react';

interface ComparatorModalProps {
  models: SmartLockModel[];
  onRemoveModel: (slug: string) => void;
  onClose: () => void;
  onViewModel: (slug: string) => void;
}

export const ComparatorModal: React.FC<ComparatorModalProps> = ({
  models,
  onRemoveModel,
  onClose,
  onViewModel,
}) => {
  if (models.length === 0) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="comparator-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
    >
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#12161B]/10 p-5 sm:p-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#12161B]/10 mb-6">
          <div>
            <h3
              id="comparator-title"
              className="text-xl sm:text-2xl font-bold font-heading text-[#12161B]"
            >
              Comparador de cerraduras ({models.length} de 3 seleccionadas)
            </h3>
            <p className="text-xs text-[#5B6772] mt-0.5">
              Compara especificaciones técnicas verificadas frente a frente antes de cotizar.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-lg text-[#5B6772] hover:text-[#12161B] hover:bg-black/5 cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1E9E57]"
            aria-label="Cerrar comparador"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Desktop Comparison Table (Hidden on small screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="border-b border-[#12161B]/10">
                <th className="py-3 px-4 font-semibold text-[#5B6772] w-1/4">
                  Característica
                </th>
                {models.map((m) => (
                  <th key={m.slug} className="py-3 px-4 w-1/4">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="font-bold text-base font-heading text-[#12161B]">
                          {m.displayName}
                        </div>
                        <div className="text-xs text-[#1E9E57] font-medium flex items-center gap-1 mt-0.5">
                          <ShieldCheck className="w-3.5 h-3.5" /> 1 año de garantía
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onRemoveModel(m.slug)}
                        className="text-xs text-[#5B6772] hover:text-red-600 cursor-pointer"
                        title="Quitar de la comparación"
                      >
                        Quitar
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#12161B]/5 text-xs sm:text-sm">
              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Modos de apertura</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#5B6772]">
                    {m.openingModes.length > 0 ? (
                      <ul className="space-y-1">
                        {m.openingModes.map((mode) => (
                          <li key={mode} className="flex items-center gap-1 text-[#12161B]">
                            <Check className="w-3.5 h-3.5 text-[#1E9E57]" />
                            <span className="capitalize">{mode}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      'Consultar por WhatsApp'
                    )}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Aplicación móvil</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#12161B] font-medium">
                    {m.app || 'Por confirmar'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Conectividad</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#5B6772]">
                    {m.connection || 'Consultar'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Pantalla y cámara</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#5B6772]">
                    {m.screen || (m.hasVideoCall ? 'Sí, videollamada' : 'No incluye pantalla')}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Alimentación / Batería</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#5B6772]">
                    {m.battery || 'Consultar por WhatsApp'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Protección a intemperie</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#12161B] font-semibold">
                    {m.ipRating || 'Por confirmar'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Tipo de cierre</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-[#5B6772]">
                    {m.lockingType || 'Automático'}
                  </td>
                ))}
              </tr>

              <tr>
                <td className="py-3 px-4 font-medium text-[#12161B]">Qué incluye</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-3 px-4 text-xs text-[#5B6772]">
                    {m.includes && m.includes.length > 0 ? (
                      <p>{m.includes.slice(0, 4).join(', ')} + instalación básica y soporte.</p>
                    ) : (
                      'Instalación básica, programación y garantía.'
                    )}
                  </td>
                ))}
              </tr>

              {/* Fila de acción CTA */}
              <tr>
                <td className="py-4 px-4 font-medium text-[#12161B]">Acción</td>
                {models.map((m) => (
                  <td key={m.slug} className="py-4 px-4">
                    <a
                      href={getModelQuoteUrl(m.code, 'comparador')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 px-3 bg-[#1E9E57] hover:bg-[#17804A] text-white text-xs font-semibold rounded-[10px] shadow-xs transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Cotizar {m.code}</span>
                    </a>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stacked Cards (Never broken horizontal scroll, per §14) */}
        <div className="md:hidden space-y-6">
          {models.map((m) => (
            <div
              key={m.slug}
              className="bg-[#F6F7F5] rounded-xl border border-[#12161B]/10 p-4 space-y-3"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg font-heading text-[#12161B]">
                    {m.displayName}
                  </h4>
                  <span className="text-xs text-[#1E9E57] font-medium flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" /> Garantía directa 1 año
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveModel(m.slug)}
                  className="text-xs text-red-600 font-medium p-1 cursor-pointer"
                >
                  Quitar
                </button>
              </div>

              <div className="space-y-2 text-xs border-t border-[#12161B]/10 pt-2">
                <div>
                  <span className="font-semibold text-[#12161B]">Apertura: </span>
                  <span className="text-[#5B6772]">
                    {m.openingModes.join(', ') || 'Consultar por WhatsApp'}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-[#12161B]">App: </span>
                  <span className="text-[#5B6772]">{m.app || 'Por confirmar'}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#12161B]">Batería: </span>
                  <span className="text-[#5B6772]">{m.battery || 'Consultar'}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#12161B]">Protección: </span>
                  <span className="text-[#5B6772]">{m.ipRating || 'Por confirmar'}</span>
                </div>
                <div>
                  <span className="font-semibold text-[#12161B]">Cierre: </span>
                  <span className="text-[#5B6772]">{m.lockingType || 'Automático'}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={getModelQuoteUrl(m.code, 'comparador_mobile')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-[#1E9E57] hover:bg-[#17804A] text-white text-xs font-semibold rounded-[10px]"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Cotizar {m.code} por WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewModel(m.slug);
                  }}
                  className="text-xs text-[#12161B] font-medium text-center hover:underline cursor-pointer py-1"
                >
                  Ver ficha completa
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-[#12161B]/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 bg-[#12161B] text-white text-xs font-semibold rounded-[10px] hover:bg-black/80 cursor-pointer"
          >
            Cerrar comparador
          </button>
        </div>
      </div>
    </div>
  );
};
