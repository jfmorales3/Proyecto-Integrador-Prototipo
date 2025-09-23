import React, { useState } from 'react';
import { AppView } from '../../types.ts';
import { ArrowLeftIcon } from '../icons.tsx';

interface RoadReportScreenProps {
  setView: (view: AppView) => void;
  isOnline: boolean;
}

const RoadReportScreen: React.FC<RoadReportScreenProps> = ({ setView, isOnline }) => {
    const [reportSent, setReportSent] = useState(false);

    const handleSubmit = () => {
        setReportSent(true);
        setTimeout(() => {
            setView(AppView.DASHBOARD);
        }, 3000);
    };

  return (
    <div className="flex flex-col h-full w-full bg-hueso p-6">
      <header className="flex items-center mb-6">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 rounded-full hover:bg-musgo-claro/50">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800"/>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Reportar Novedad en la Vía</h1>
      </header>

      {reportSent ? (
        <div className="flex-grow flex flex-col items-center justify-center text-center">
            <h2 className="text-2xl font-bold text-musgo">¡Gracias por tu reporte!</h2>
            <p className="text-lg mt-2 text-gray-700">Reporte guardado.</p>
            {!isOnline && <p className="text-lg text-naranja-quemado">Se enviará al conectar a internet.</p>}
        </div>
      ) : (
        <main className="flex-grow flex flex-col space-y-6">
            <div className="bg-gray-300 h-48 rounded-lg flex items-center justify-center overflow-hidden">
                <img src="/media/Map.png" alt="Mapa de ubicación actual" className="w-full h-full object-cover rounded-lg" />
            </div>

            <div>
                <label htmlFor="problem-type" className="block text-lg font-semibold text-gray-700">Tipo de problema</label>
                <select id="problem-type" className="w-full mt-1 p-3 text-lg border-2 border-musgo-claro rounded-md focus:ring-musgo focus:border-musgo bg-white">
                    <option>Derrumbe</option>
                    <option>Vía en mal estado</option>
                    <option>Puente caído</option>
                    <option>Otro</option>
                </select>
            </div>
            
            <div>
                <label htmlFor="comment" className="block text-lg font-semibold text-gray-700">Añadir un comentario (opcional)</label>
                <textarea id="comment" rows={3} className="w-full mt-1 p-3 text-lg border-2 border-musgo-claro rounded-md focus:ring-musgo focus:border-musgo"></textarea>
            </div>

            <div className="flex-grow"></div>

            <button onClick={handleSubmit} className="w-full bg-naranja-quemado text-white text-xl font-bold py-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
                Enviar Reporte de Vía
            </button>
        </main>
      )}
    </div>
  );
};

export default RoadReportScreen;