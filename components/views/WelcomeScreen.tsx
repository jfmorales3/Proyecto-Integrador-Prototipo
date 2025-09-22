import React, { useEffect, useState } from 'react';
import { AppView } from '../../types.ts';
import { CloudIcon } from '../icons.tsx';

interface WelcomeScreenProps {
  setView: (view: AppView) => void;
  isOnline: boolean;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ setView, isOnline }) => {
  const [loadingText, setLoadingText] = useState("Cargando tu jornada...");

  useEffect(() => {
    if (!isOnline) {
      setLoadingText("Cargando datos guardados...");
    } else {
      setLoadingText("Sincronizando datos...");
    }

    const timer = setTimeout(() => {
      setView(AppView.DASHBOARD);
    }, 2500);

    return () => clearTimeout(timer);
  }, [isOnline, setView]);

  return (
    <div className="flex flex-col items-center justify-between h-full w-full bg-hueso p-4">
      <div className="w-full flex justify-end">
        <CloudIcon isOnline={isOnline} />
      </div>
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-musgo p-4 rounded-lg shadow-md mb-4">
          <span className="text-4xl font-bold text-hueso">JornalAPP</span>
        </div>
        <p className="text-lg text-gray-700">{loadingText}</p>
        <div className="mt-4 animate-spin rounded-full h-12 w-12 border-b-2 border-musgo"></div>
      </div>
      <div className="h-10"></div>
    </div>
  );
};

export default WelcomeScreen;