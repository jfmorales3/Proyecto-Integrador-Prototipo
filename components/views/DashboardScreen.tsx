import React from 'react';
import { AppView } from '../../types.ts';
import { BriefcaseIcon, MapPinIcon, StarIcon, UserIcon } from '../icons.tsx';

interface DashboardScreenProps {
  setView: (view: AppView) => void;
}

const ActionButton: React.FC<{ onClick: () => void; icon: React.ReactNode; label: string; primary?: boolean }> = ({ onClick, icon, label, primary = false }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center text-lg font-bold p-4 rounded-lg shadow-md transition-transform transform hover:scale-105 ${
      primary ? 'bg-musgo text-hueso' : 'bg-musgo-claro text-gray-800'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const DashboardScreen: React.FC<DashboardScreenProps> = ({ setView }) => {
  return (
    <div className="flex flex-col h-full w-full bg-hueso p-6 space-y-6">
      <header className="flex items-center space-x-4">
        <img src="https://picsum.photos/100" alt="Foto de perfil" className="w-16 h-16 rounded-full border-4 border-musgo-claro" />
        <div>
          <h1 className="text-3xl font-bold text-gray-800">¡Hola, José!</h1>
        </div>
      </header>
      
      <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-800">Tu Perfil</h2>
          <div className="flex items-center bg-ocre text-white px-3 py-1 rounded-full text-lg">
            <span className="font-bold">4.5</span>
            <StarIcon className="w-5 h-5 ml-1" />
          </div>
        </div>
        <div className="text-gray-600 space-y-1">
          <p className="font-semibold">Habilidades Principales:</p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-hueso px-2 py-1 rounded-md text-sm">Recolector de Café</span>
            <span className="bg-hueso px-2 py-1 rounded-md text-sm">Poda</span>
            <span className="bg-hueso px-2 py-1 rounded-md text-sm">Desyerbe</span>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col justify-center space-y-4">
        <ActionButton 
          onClick={() => setView(AppView.JOB_IN_PROGRESS)} 
          icon={<BriefcaseIcon className="w-6 h-6"/>} 
          label="Mi Jornal de Hoy" 
          primary 
        />
        <ActionButton 
          onClick={() => setView(AppView.MY_APPLICATIONS)} 
          icon={<UserIcon className="w-6 h-6"/>} 
          label="Mis Postulaciones" 
        />
        <ActionButton 
          onClick={() => setView(AppView.ROAD_REPORT)} 
          icon={<MapPinIcon className="w-6 h-6"/>} 
          label="Reportar Estado de Vía" 
        />
      </main>
    </div>
  );
};

export default DashboardScreen;