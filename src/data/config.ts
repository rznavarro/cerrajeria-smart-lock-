import { SiteConfig } from '../types';

export const SITE_CONFIG: SiteConfig = {
  name: 'Cerrajería Smart Lock',
  phoneDisplay: '33 1196 6152',
  phoneCallable: '+523311966152',
  whatsappNumber: '5213311966152',
  whatsappLink: 'https://wa.me/5213311966152',
  email: 'info@cerrajeriasmartlock.com',
  warrantyYears: 1,
  branches: [
    {
      name: 'Sucursal Santa Rita',
      slug: 'santa-rita',
      address: null,
      hours: null,
      mapUrl: null,
    },
    {
      name: 'Sucursal Naciones Unidas',
      slug: 'naciones-unidas',
      address: null,
      hours: null,
      mapUrl: null,
    },
  ],
  reviews: [], // Por directriz estricta, vacío hasta contar con reseñas reales verificadas
  whatsappVerificationNote:
    'Nota: El número telefónico proviene del sitio actual y debe verificarse con el cliente antes de publicar.',
  basicInstallationNotice:
    'La instalación básica aplica a puertas de madera sin metal, de 4 a 12 cm de grosor, planas y sin relieve. Puertas con diseño especial o metálicas pueden tener costo adicional.',
};

/**
 * Preparación de eventos de analítica listos para GA4 o Meta Pixel
 * sin simulación artificial ni llamadas rotas.
 */
export function trackAnalyticsEvent(
  eventName: 'clic_whatsapp' | 'clic_llamar' | 'cotizador_enviado',
  params?: Record<string, unknown>
) {
  if (typeof window !== 'undefined') {
    // Si GA4 (gtag) está instalado en el sitio del cliente:
    const win = window as unknown as { gtag?: (type: string, name: string, data?: unknown) => void; fbq?: (type: string, name: string, data?: unknown) => void };
    if (typeof win.gtag === 'function') {
      win.gtag('event', eventName, params);
    }
    // Si Meta Pixel (fbq) está instalado:
    if (typeof win.fbq === 'function') {
      win.fbq('trackCustom', eventName, params);
    }
  }
}
