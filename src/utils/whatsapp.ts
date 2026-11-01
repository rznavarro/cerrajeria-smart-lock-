import { SITE_CONFIG, trackAnalyticsEvent } from '../data/config';

export interface QuoteFormData {
  serviceType:
    | 'cerradura'
    | 'auto'
    | 'servicio_tecnico'
    | 'residencial'
    | 'flotilla';
  modelCode?: string;
  doorType?: string;
  doorThickness?: string;
  openingPreferences?: string[];
  // Campos para auto / flotilla
  carBrand?: string;
  carModel?: string;
  carYear?: string;
  carServiceType?: string;
  // Campos generales
  serviceDetails?: string;
  neighborhoodZone?: string;
  customerName?: string;
}

/**
 * Genera el enlace oficial a WhatsApp con texto prellenado
 */
export function buildWhatsAppUrl(messageText: string): string {
  const encoded = encodeURIComponent(messageText.trim());
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encoded}`;
}

/**
 * Arma el mensaje para cotizar una cerradura específica
 */
export function getModelQuoteUrl(modelCode: string, context = 'catalogo'): string {
  trackAnalyticsEvent('clic_whatsapp', { context, model: modelCode });
  const msg = `Hola, quiero cotizar la cerradura ${modelCode} con instalación básica y garantía por escrito. ¿Me pueden dar informes?`;
  return buildWhatsAppUrl(msg);
}

/**
 * Arma el mensaje para rentas vacacionales
 */
export function getVacationRentalQuoteUrl(): string {
  trackAnalyticsEvent('clic_whatsapp', { context: 'renta_vacacional' });
  const msg =
    'Hola, quiero cotizar una cerradura con app TTLock para mi renta vacacional para dar códigos temporales a mis huéspedes sin entregar llaves.';
  return buildWhatsAppUrl(msg);
}

/**
 * Arma el mensaje para llaves de auto
 */
export function getCarKeyQuoteUrl(): string {
  trackAnalyticsEvent('clic_whatsapp', { context: 'llaves_auto' });
  const msg =
    'Hola, quiero cotizar una llave de auto / duplicado / carcasa. ¿Me pueden indicar qué datos necesitan de mi vehículo?';
  return buildWhatsAppUrl(msg);
}

/**
 * Arma el mensaje para flotillas
 */
export function getFleetQuoteUrl(): string {
  trackAnalyticsEvent('clic_whatsapp', { context: 'flotillas' });
  const msg =
    'Hola, quiero cotizar el servicio especial para flotillas de vehículos (copias, reparación y llaves nuevas).';
  return buildWhatsAppUrl(msg);
}

/**
 * Arma el mensaje para servicio técnico de otras marcas (Yale, Samsung, etc.)
 */
export function getTechServiceQuoteUrl(brandOrProblem?: string): string {
  trackAnalyticsEvent('clic_whatsapp', { context: 'servicio_tecnico' });
  const detail = brandOrProblem ? ` para cerradura ${brandOrProblem}` : '';
  const msg = `Hola, necesito consultar sobre servicio técnico / reparación / programación${detail}.`;
  return buildWhatsAppUrl(msg);
}

/**
 * Genera el enlace de WhatsApp estructurado a partir del formulario del Cotizador
 */
export function buildCotizadorWhatsAppUrl(data: QuoteFormData): string {
  trackAnalyticsEvent('cotizador_enviado', { type: data.serviceType });

  let lines: string[] = [];

  switch (data.serviceType) {
    case 'cerradura': {
      lines.push('Hola, quiero cotizar una cerradura inteligente con instalación.');
      if (data.modelCode) lines.push(`· Modelo de interés: ${data.modelCode}`);
      if (data.doorType) lines.push(`· Tipo de puerta: ${data.doorType}`);
      if (data.doorThickness) lines.push(`· Grosor aprox: ${data.doorThickness} cm`);
      if (data.openingPreferences && data.openingPreferences.length > 0) {
        lines.push(`· Deseo abrir con: ${data.openingPreferences.join(', ')}`);
      }
      break;
    }
    case 'auto': {
      lines.push('Hola, quiero cotizar una llave de auto.');
      if (data.carBrand || data.carModel || data.carYear) {
        lines.push(
          `· Vehículo: ${data.carBrand || ''} ${data.carModel || ''} ${data.carYear || ''}`.trim()
        );
      }
      if (data.carServiceType) lines.push(`· Servicio: ${data.carServiceType}`);
      break;
    }
    case 'servicio_tecnico': {
      lines.push('Hola, necesito servicio técnico o reparación para cerradura inteligente.');
      if (data.serviceDetails) lines.push(`· Detalle / Marca: ${data.serviceDetails}`);
      break;
    }
    case 'residencial': {
      lines.push('Hola, requiero servicio de cerrajería residencial.');
      if (data.serviceDetails) lines.push(`· Tipo de servicio: ${data.serviceDetails}`);
      if (data.doorType) lines.push(`· Tipo de puerta: ${data.doorType}`);
      break;
    }
    case 'flotilla': {
      lines.push('Hola, quiero cotizar servicio de llaves para flotilla empresarial.');
      if (data.serviceDetails) lines.push(`· Requerimiento: ${data.serviceDetails}`);
      break;
    }
  }

  if (data.neighborhoodZone) {
    lines.push(`· Colonia o zona: ${data.neighborhoodZone}`);
  }
  if (data.customerName) {
    lines.push(`· Nombre: ${data.customerName}`);
  }

  return buildWhatsAppUrl(lines.join('\n'));
}

/**
 * Enlace mailto alternativo de respaldo
 */
export function buildCotizadorMailtoUrl(data: QuoteFormData): string {
  const subject = encodeURIComponent(
    `Cotización Cerrajería Smart Lock - ${data.serviceType}`
  );
  let bodyLines = [
    `Solicitud de cotización vía sitio web`,
    `Tipo de servicio: ${data.serviceType}`,
  ];
  if (data.modelCode) bodyLines.push(`Modelo: ${data.modelCode}`);
  if (data.doorType) bodyLines.push(`Puerta: ${data.doorType} (${data.doorThickness || 'N/A'} cm)`);
  if (data.serviceDetails) bodyLines.push(`Detalles: ${data.serviceDetails}`);
  if (data.neighborhoodZone) bodyLines.push(`Zona/Colonia: ${data.neighborhoodZone}`);
  if (data.customerName) bodyLines.push(`Nombre: ${data.customerName}`);

  const body = encodeURIComponent(bodyLines.join('\n'));
  return `mailto:${SITE_CONFIG.email}?subject=${subject}&body=${body}`;
}
