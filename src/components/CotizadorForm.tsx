import React, { useState } from 'react';
import { SITE_CONFIG } from '../data/config';
import {
  QuoteFormData,
  buildCotizadorWhatsAppUrl,
  buildCotizadorMailtoUrl,
} from '../utils/whatsapp';
import { SMART_LOCK_MODELS } from '../data/models';
import { Send, Mail, CheckCircle2 } from 'lucide-react';

interface CotizadorFormProps {
  initialService?: QuoteFormData['serviceType'];
  initialModel?: string;
  onSuccess?: () => void;
  className?: string;
}

export const CotizadorForm: React.FC<CotizadorFormProps> = ({
  initialService = 'cerradura',
  initialModel = '',
  onSuccess,
  className = '',
}) => {
  const [serviceType, setServiceType] =
    useState<QuoteFormData['serviceType']>(initialService);
  const [modelCode, setModelCode] = useState(initialModel);
  const [doorType, setDoorType] = useState('Madera');
  const [doorThickness, setDoorThickness] = useState('');
  const [openingPreferences, setOpeningPreferences] = useState<string[]>([
    'Huella',
    'App',
  ]);
  const [carBrand, setCarBrand] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carServiceType, setCarServiceType] = useState('Copia / Llave nueva');
  const [serviceDetails, setServiceDetails] = useState('');
  const [neighborhoodZone, setNeighborhoodZone] = useState('');
  const [customerName, setCustomerName] = useState('');

  const toggleOpeningPreference = (mode: string) => {
    setOpeningPreferences((prev) =>
      prev.includes(mode) ? prev.filter((m) => m !== mode) : [...prev, mode]
    );
  };

  const getFormData = (): QuoteFormData => ({
    serviceType,
    modelCode,
    doorType,
    doorThickness,
    openingPreferences,
    carBrand,
    carModel,
    carYear,
    carServiceType,
    serviceDetails,
    neighborhoodZone,
    customerName,
  });

  const handleSubmitWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const url = buildCotizadorWhatsAppUrl(getFormData());
    window.open(url, '_blank', 'noopener,noreferrer');
    if (onSuccess) onSuccess();
  };

  const handleSendMailto = () => {
    const url = buildCotizadorMailtoUrl(getFormData());
    window.location.href = url;
  };

  const verifiedModels = SMART_LOCK_MODELS.filter((m) => m.verified);

  return (
    <div
      className={`bg-white rounded-xl border border-[#12161B]/10 p-6 sm:p-8 shadow-sm ${className}`}
    >
      <div className="mb-6">
        <h3 className="text-xl sm:text-2xl font-bold font-heading text-[#12161B]">
          Cotizador directo a WhatsApp
        </h3>
        <p className="text-sm text-[#5B6772] mt-1">
          Completa los datos de tu puerta o vehículo para recibir tu cotización con instalación y garantía.
        </p>
      </div>

      <form onSubmit={handleSubmitWhatsApp} className="space-y-5">
        {/* Paso 1: ¿Qué necesitas? */}
        <div>
          <label className="block text-xs font-semibold text-[#12161B] uppercase tracking-wider mb-2">
            1. ¿Qué servicio necesitas?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {[
              { id: 'cerradura', label: 'Cerradura inteligente' },
              { id: 'auto', label: 'Llave de auto' },
              { id: 'servicio_tecnico', label: 'Servicio técnico' },
              { id: 'residencial', label: 'Cerrajería residencial' },
              { id: 'flotilla', label: 'Flotillas' },
            ].map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => setServiceType(option.id as QuoteFormData['serviceType'])}
                className={`px-3 py-2.5 text-xs sm:text-sm font-medium rounded-[10px] text-center border transition-all cursor-pointer ${
                  serviceType === option.id
                    ? 'border-[#12161B] bg-[#12161B] text-white shadow-xs'
                    : 'border-[#12161B]/20 bg-white text-[#12161B] hover:border-[#12161B]'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Campos condicionales para Cerradura Inteligente */}
        {serviceType === 'cerradura' && (
          <div className="space-y-4 pt-2 border-t border-[#12161B]/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cot-modelo"
                  className="block text-xs font-semibold text-[#12161B] mb-1"
                >
                  Modelo de interés (opcional)
                </label>
                <select
                  id="cot-modelo"
                  value={modelCode}
                  onChange={(e) => setModelCode(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] focus:border-[#1E9E57] focus:ring-1 focus:ring-[#1E9E57] outline-hidden"
                >
                  <option value="">Aún no decido / Recomiéndenme</option>
                  {verifiedModels.map((m) => (
                    <option key={m.slug} value={m.code}>
                      {m.displayName} {m.app ? `(${m.app})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="cot-puerta"
                  className="block text-xs font-semibold text-[#12161B] mb-1"
                >
                  Tipo de puerta
                </label>
                <select
                  id="cot-puerta"
                  value={doorType}
                  onChange={(e) => setDoorType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] focus:border-[#1E9E57] focus:ring-1 focus:ring-[#1E9E57] outline-hidden"
                >
                  <option value="Madera">Madera</option>
                  <option value="Metal">Metal</option>
                  <option value="Aluminio">Aluminio</option>
                  <option value="Cristal">Cristal</option>
                  <option value="No sé">No estoy seguro(a)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="cot-grosor"
                  className="block text-xs font-semibold text-[#12161B] mb-1"
                >
                  Grosor de puerta aproximado en cm (opcional)
                </label>
                <input
                  type="text"
                  id="cot-grosor"
                  value={doorThickness}
                  onChange={(e) => setDoorThickness(e.target.value)}
                  placeholder="Ej. 4.5 cm"
                  className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] focus:border-[#1E9E57] focus:ring-1 focus:ring-[#1E9E57] outline-hidden"
                />
              </div>

              <div>
                <span className="block text-xs font-semibold text-[#12161B] mb-1">
                  ¿Cómo quieres abrir? (Selecciona una o más)
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {['Huella', 'Rostro', 'Código', 'App', 'Tarjeta', 'Llave'].map((m) => {
                    const selected = openingPreferences.includes(m);
                    return (
                      <button
                        key={m}
                        type="button"
                        onClick={() => toggleOpeningPreference(m)}
                        className={`px-2.5 py-1 text-xs rounded-md border transition-colors cursor-pointer ${
                          selected
                            ? 'bg-[#12161B] text-white border-[#12161B]'
                            : 'bg-white text-[#5B6772] border-[#12161B]/20 hover:text-[#12161B]'
                        }`}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Campos condicionales para Llave de Auto */}
        {serviceType === 'auto' && (
          <div className="space-y-4 pt-2 border-t border-[#12161B]/10">
            <div className="grid grid-cols-3 gap-2">
              <div>
                <label
                  htmlFor="cot-marca"
                  className="block text-xs font-semibold text-[#12161B] mb-1"
                >
                  Marca
                </label>
                <input
                  type="text"
                  id="cot-marca"
                  value={carBrand}
                  onChange={(e) => setCarBrand(e.target.value)}
                  placeholder="Ej. Nissan"
                  className="w-full px-3 py-2 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
                />
              </div>
              <div>
                <label
                  htmlFor="cot-submarca"
                  className="block text-xs font-semibold text-[#12161B] mb-1"
                >
                  Modelo
                </label>
                <input
                  type="text"
                  id="cot-submarca"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  placeholder="Ej. Versa"
                  className="w-full px-3 py-2 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
                />
              </div>
              <div>
                <label
                  htmlFor="cot-ano"
                  className="block text-xs font-semibold text-[#12161B] mb-1"
                >
                  Año
                </label>
                <input
                  type="text"
                  id="cot-ano"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
                  placeholder="Ej. 2021"
                  className="w-full px-3 py-2 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="cot-servicio-auto"
                className="block text-xs font-semibold text-[#12161B] mb-1"
              >
                Servicio requerido
              </label>
              <select
                id="cot-servicio-auto"
                value={carServiceType}
                onChange={(e) => setCarServiceType(e.target.value)}
                className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
              >
                <option value="Copia / Duplicado de llave">Copia / Duplicado con chip</option>
                <option value="Llave nueva (perdida total)">Llave nueva (todas las llaves perdidas)</option>
                <option value="Cambio de carcasa">Cambio de carcasa / botonera rota</option>
                <option value="Cambio de batería o funda">Funda de silicón o cambio de batería</option>
                <option value="Reparación de control">Reparación de control / control que no abre</option>
              </select>
            </div>
          </div>
        )}

        {/* Campos para Servicio Técnico / Residencial / Flotilla */}
        {(serviceType === 'servicio_tecnico' ||
          serviceType === 'residencial' ||
          serviceType === 'flotilla') && (
          <div className="space-y-4 pt-2 border-t border-[#12161B]/10">
            <div>
              <label
                htmlFor="cot-detalles"
                className="block text-xs font-semibold text-[#12161B] mb-1"
              >
                Detalle del servicio o marca de tu cerradura (ej. Yale, Samsung, puerta de cristal...)
              </label>
              <textarea
                id="cot-detalles"
                rows={3}
                value={serviceDetails}
                onChange={(e) => setServiceDetails(e.target.value)}
                placeholder="Cuéntanos qué requiere reparación, cambio de combinación o servicio técnico..."
                className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
              />
            </div>
          </div>
        )}

        {/* Campos finales: Ubicación y Nombre */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[#12161B]/10">
          <div>
            <label
              htmlFor="cot-zona"
              className="block text-xs font-semibold text-[#12161B] mb-1"
            >
              Colonia o zona (para calcular viáticos si aplica)
            </label>
            <input
              type="text"
              id="cot-zona"
              value={neighborhoodZone}
              onChange={(e) => setNeighborhoodZone(e.target.value)}
              placeholder="Ej. Santa Rita / Providencia / Zona Centro..."
              className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
            />
          </div>

          <div>
            <label
              htmlFor="cot-nombre"
              className="block text-xs font-semibold text-[#12161B] mb-1"
            >
              Tu nombre (opcional)
            </label>
            <input
              type="text"
              id="cot-nombre"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Ej. Carlos"
              className="w-full px-3 py-2.5 bg-white border border-[#12161B]/20 rounded-[10px] text-sm text-[#12161B] outline-hidden"
            />
          </div>
        </div>

        {/* Letra chica visible requerida */}
        <div className="bg-[#F6F7F5] p-3 rounded-lg text-xs text-[#5B6772] space-y-1">
          <p className="font-medium text-[#12161B]">Condiciones de instalación:</p>
          <p>{SITE_CONFIG.basicInstallationNotice}</p>
          <p className="text-[11px] text-[#5B6772]/80 pt-1">
            {SITE_CONFIG.whatsappVerificationNote}
          </p>
        </div>

        {/* Botones de acción */}
        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 h-[52px] bg-[#1E9E57] hover:bg-[#17804A] text-white font-semibold text-base rounded-[10px] shadow-sm transition-colors cursor-pointer"
          >
            <Send className="w-5 h-5" aria-hidden="true" />
            <span>Cotizar mi cerradura por WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={handleSendMailto}
            className="flex items-center justify-center gap-2 h-[52px] px-5 border-2 border-[#12161B] hover:bg-black/5 text-[#12161B] font-semibold text-sm rounded-[10px] transition-colors cursor-pointer"
          >
            <Mail className="w-4 h-4" aria-hidden="true" />
            <span>Prefiero enviar un correo</span>
          </button>
        </div>
      </form>
    </div>
  );
};
