import React from 'react';
import { AppView } from '../../types.ts';

interface LandingScreenProps {
  setView: (view: AppView) => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ setView }) => {
  return (
    <div className="relative flex flex-col h-full w-full bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/agriculture/400/800')" }}>
      <div className="absolute inset-0 bg-black/60"></div>
      
      <div className="relative z-10 flex flex-col h-full p-8 text-center justify-between">
        <header className="flex-shrink-0">
          <div className="bg-musgo/80 inline-block p-2 rounded-lg shadow-md">
            <span className="text-4xl font-bold text-hueso">JornalAPP</span>
          </div>
        </header>

        <main className="flex-grow flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold leading-tight mb-4">
                Conectando el campo,<br/>Cosechando oportunidades.
            </h1>
            <p className="text-lg text-hueso/90 max-w-xs">
                La plataforma para jornaleros y fincas. Encuentra trabajo, gestiona tus pagos y reporta el estado de las vías.
            </p>
        </main>
        
        <footer className="flex-shrink-0">
          <button
            onClick={() => setView(AppView.WELCOME)}
            className="w-full bg-naranja-quemado text-white text-xl font-bold py-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
          >
            Iniciar Sesión
          </button>
          <p className="mt-4 text-sm text-gray-300">¿No tienes cuenta? <a href="#" className="underline font-semibold">Regístrate</a></p>
        </footer>
      </div>
    </div>
  );
};

export default LandingScreen;