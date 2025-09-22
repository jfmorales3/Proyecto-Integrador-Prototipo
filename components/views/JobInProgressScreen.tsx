import React, { useState } from 'react';
import { AppView } from '../../types.ts';
import { ArrowLeftIcon } from '../icons.tsx';

interface JobInProgressScreenProps {
  setView: (view: AppView) => void;
  isOnline: boolean;
}

const JobInProgressScreen: React.FC<JobInProgressScreenProps> = ({ setView, isOnline }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reportStatus, setReportStatus] = useState<'idle' | 'pending' | 'submitted'>('idle');

  const handleSendReport = () => {
    setReportStatus('pending');
    setTimeout(() => {
        setReportStatus('submitted');
    }, 1500);
  };
  
  return (
    <div className="flex flex-col h-full w-full bg-hueso p-6">
      <header className="flex items-center mb-6">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 rounded-full hover:bg-musgo-claro/50">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800"/>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Jornal en: Finca La Esperanza</h1>
      </header>

      <main className="flex-grow flex flex-col justify-between">
        <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-3">
          <h2 className="text-xl font-bold text-gray-800">Detalles del Trabajo</h2>
          <div className="text-gray-700 text-lg space-y-2">
            <p><span className="font-semibold">Tarea:</span> Desyerbe lote 3</p>
            <p><span className="font-semibold">Pago Acordado:</span> $50,000 COP</p>
            <p><span className="font-semibold">Capataz:</span> Sr. Ramirez</p>
          </div>
        </div>

        <div className="mt-8">
            <button
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-musgo text-hueso text-xl font-bold py-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
                Finalizar y Reportar Horas
            </button>
             <button
                onClick={() => setView(AppView.SCAN_QR)}
                className="w-full mt-4 bg-ocre text-white text-xl font-bold py-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
            >
                Recibir Pago
            </button>
        </div>
      </main>

      {isModalOpen && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-hueso rounded-lg shadow-2xl p-6 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Reportar Horas</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="hours" className="block text-lg font-semibold text-gray-700">Horas trabajadas</label>
                <input type="number" id="hours" defaultValue={8} className="w-full mt-1 p-3 text-lg border-2 border-musgo-claro rounded-md focus:ring-musgo focus:border-musgo" />
              </div>
              <div>
                <button className="w-full bg-ocre text-white p-3 rounded-md text-lg font-semibold flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M20.4 14.5L16 10 4 20"/></svg>
                  Adjuntar Foto de Evidencia
                </button>
                <p className="text-sm text-center mt-1 text-gray-600">Evidencia ya adjunta (prototipo).</p>
              </div>

              {reportStatus === 'idle' && (
                  <button onClick={handleSendReport} className="w-full bg-musgo text-hueso font-bold py-3 text-lg rounded-md transition-transform transform hover:scale-105">
                    Enviar Reporte
                  </button>
              )}
              {reportStatus === 'pending' && (
                  <button disabled className="w-full bg-musgo-claro text-gray-800 font-bold py-3 text-lg rounded-md cursor-wait">
                    Guardando...
                  </button>
              )}
               {reportStatus === 'submitted' && (
                  <div className="text-center p-3 bg-ocre/20 rounded-md">
                     <p className="font-bold text-naranja-quemado">Reporte Guardado</p>
                     {!isOnline && <p className="text-sm text-gray-700">(Pendiente de sinc.)</p>}
                  </div>
              )}
              
              <button onClick={() => setIsModalOpen(false)} className="w-full text-center text-gray-600 p-2 mt-2 text-lg">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobInProgressScreen;