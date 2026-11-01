import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ModelDetail } from './pages/ModelDetail';
import { Automotive } from './pages/Automotive';
import { LocksmithService } from './pages/LocksmithService';
import { BranchesContact } from './pages/BranchesContact';
import { SMART_LOCK_MODELS } from './data/models';
import { LockUsage } from './types';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      // Redirigir /inicio a /
      if (path === '/inicio' || path === '/inicio/') {
        window.history.replaceState({}, '', '/');
        return '/';
      }
      return path || '/';
    }
    return '/';
  });

  const [searchParams, setSearchParams] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return window.location.search;
    }
    return '';
  });

  // Escuchar cambios de historial en el navegador (Back/Forward)
  useEffect(() => {
    const handlePopState = () => {
      let path = window.location.pathname;
      if (path === '/inicio' || path === '/inicio/') {
        window.history.replaceState({}, '', '/');
        path = '/';
      }
      setCurrentPath(path || '/');
      setSearchParams(window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (pathWithQuery: string) => {
    const [pathPart, queryPart] = pathWithQuery.split('?');
    let targetPath = pathPart;
    if (targetPath === '/inicio' || targetPath === '/inicio/') {
      targetPath = '/';
    }

    const fullTarget = queryPart ? `${targetPath}?${queryPart}` : targetPath;
    window.history.pushState({}, '', fullTarget);
    setCurrentPath(targetPath);
    setSearchParams(queryPart ? `?${queryPart}` : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Parser de ruta
  let pageContent: React.ReactNode = null;
  let activeModelCode: string | undefined = undefined;

  // Actualizar metadatos del documento dinámicamente según la vista
  useEffect(() => {
    let title = 'Cerrajería Smart Lock';
    let desc =
      'Cerraduras inteligentes instaladas, programadas y con garantía por escrito. Llaves automotrices, cerrajería residencial y servicio técnico.';

    if (currentPath === '/') {
      title = 'Cerrajería Smart Lock | Cerraduras inteligentes instaladas y con garantía';
    } else if (currentPath === '/cerraduras-inteligentes') {
      title = 'Catálogo de Cerraduras Inteligentes | Cerrajería Smart Lock';
      desc =
        'Compara cerraduras inteligentes con apertura por rostro 3D, huella, código y app. Instalación básica y garantía por escrito incluidas.';
    } else if (currentPath.startsWith('/cerraduras-inteligentes/')) {
      const slug = currentPath.replace('/cerraduras-inteligentes/', '').replace(/\/$/, '');
      const found = SMART_LOCK_MODELS.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
      if (found) {
        title = `Cerradura ${found.displayName} con Instalación | Cerrajería Smart Lock`;
        desc =
          found.shortDescription ||
          `Ficha técnica de la cerradura inteligente ${found.displayName}. 1 año de garantía por escrito.`;
      }
    } else if (currentPath === '/llaves-automotrices') {
      title = 'Llaves Automotrices y Flotillas | Cerrajería Smart Lock';
      desc =
        'Duplicados con chip, llaves nuevas por extravío, cambio de carcasas y servicio especial para empresas con flotillas.';
    } else if (currentPath === '/cerrajeria-y-servicio-tecnico') {
      title = 'Cerrajería Residencial y Servicio Técnico Multimarca | Cerrajería Smart Lock';
      desc =
        'Reparación y programación de cerraduras de todas las marcas, como Yale y Samsung. Cerrajería residencial y puertas de cristal.';
    } else if (currentPath === '/sucursales-y-contacto') {
      title = 'Sucursales y Contacto | Cerrajería Smart Lock';
      desc =
        'Contáctanos por WhatsApp al 33 1196 6152 o visítanos en Sucursal Santa Rita o Sucursal Naciones Unidas.';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', desc);
    }
  }, [currentPath]);

  // Enrutamiento de vistas
  if (currentPath === '/' || currentPath === '') {
    pageContent = <Home onNavigate={navigate} />;
  } else if (currentPath === '/cerraduras-inteligentes') {
    const params = new URLSearchParams(searchParams);
    const initialUsage = (params.get('uso') as LockUsage) || null;
    pageContent = <Catalog onNavigate={navigate} initialUsageFilter={initialUsage} />;
  } else if (currentPath.startsWith('/cerraduras-inteligentes/')) {
    const slug = currentPath.replace('/cerraduras-inteligentes/', '').replace(/\/$/, '');
    const model = SMART_LOCK_MODELS.find((m) => m.slug.toLowerCase() === slug.toLowerCase());
    if (model) {
      activeModelCode = model.code;
    }
    pageContent = <ModelDetail slug={slug} onNavigate={navigate} />;
  } else if (currentPath === '/llaves-automotrices') {
    pageContent = <Automotive onNavigate={navigate} />;
  } else if (currentPath === '/cerrajeria-y-servicio-tecnico') {
    pageContent = <LocksmithService onNavigate={navigate} />;
  } else if (currentPath === '/sucursales-y-contacto') {
    pageContent = <BranchesContact onNavigate={navigate} />;
  } else {
    // 404 Fallback
    pageContent = (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-3xl font-bold font-heading text-[#12161B]">Página no encontrada</h1>
        <p className="text-sm text-[#5B6772]">
          La página solicitada no existe o fue reubicada.
        </p>
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#12161B] text-white text-xs font-semibold rounded-[10px]"
        >
          Ir al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F7F5] text-[#12161B]">
      {/* Barra de navegación superior */}
      <Header currentPath={currentPath} onNavigate={navigate} />

      {/* Contenido principal */}
      <main className="flex-1 pb-16 lg:pb-0">{pageContent}</main>

      {/* Pie de página */}
      <Footer onNavigate={navigate} />

      {/* Barra fija inferior en móvil (tap target >= 48px) */}
      <MobileBottomBar currentModelCode={activeModelCode} />
    </div>
  );
}
