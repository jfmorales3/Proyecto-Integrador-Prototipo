import React, { useState } from 'react';
import { AppView } from '../../types.ts';
import { ArrowLeftIcon, BriefcaseIcon, MapPinIcon } from '../icons.tsx';

interface MyApplicationsScreenProps {
  setView: (view: AppView) => void;
}

const newJobs = [
  {
    id: 'job1',
    title: 'Recolector de Café',
    farm: 'Finca El Mirador',
    location: 'Salento, Quindío',
    pay: '60,000 COP / día',
  },
  {
    id: 'job2',
    title: 'Control de Plagas (Orgánico)',
    farm: 'Hacienda Venecia',
    location: 'Manizales, Caldas',
    pay: '55,000 COP / día',
  },
  {
    id: 'job3',
    title: 'Siembra de Plátano',
    farm: 'Finca La Palmera',
    location: 'Anserma, Caldas',
    pay: '50,000 COP / día',
  },
];

const applicationHistory = [
  {
    id: 'hist1',
    title: 'Desyerbe lote 3',
    farm: 'Finca La Esperanza',
    status: 'Aceptada',
    statusColor: 'text-musgo',
    bgColor: 'bg-musgo/20'
  },
  {
    id: 'hist2',
    title: 'Poda de Naranjos',
    farm: 'Finca El Ocaso',
    status: 'Rechazada',
    statusColor: 'text-naranja-quemado',
    bgColor: 'bg-naranja-quemado/20'
  },
  {
    id: 'hist3',
    title: 'Cosecha de Aguacate',
    farm: 'Finca Santa Rita',
    status: 'Finalizada',
    statusColor: 'text-gray-600',
    bgColor: 'bg-gray-200'
  },
];

const MyApplicationsScreen: React.FC<MyApplicationsScreenProps> = ({ setView }) => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');

  return (
    <div className="flex flex-col h-full w-full bg-hueso">
      <header className="flex items-center p-6 bg-white shadow-sm sticky top-0 z-10">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 rounded-full hover:bg-musgo-claro/50">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800"/>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Mis Postulaciones</h1>
      </header>

      <nav className="flex bg-musgo-claro/30 p-1">
        <button
          onClick={() => setActiveTab('new')}
          className={`w-1/2 p-3 font-bold text-lg transition-colors ${activeTab === 'new' ? 'bg-musgo text-white rounded-md' : 'text-gray-700'}`}
        >
          Nuevas Oportunidades
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`w-1/2 p-3 font-bold text-lg transition-colors ${activeTab === 'history' ? 'bg-musgo text-white rounded-md' : 'text-gray-700'}`}
        >
          Historial
        </button>
      </nav>

      <main className="flex-grow p-6 space-y-4 overflow-y-auto">
        {activeTab === 'new' && (
          <div className="space-y-4">
            {newJobs.map(job => (
              <div key={job.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200 space-y-3">
                <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                <div className="text-gray-700 space-y-1">
                  <div className="flex items-center">
                    <BriefcaseIcon className="w-5 h-5 mr-2 text-musgo"/>
                    <p className="font-semibold">{job.farm}</p>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-2 text-musgo"/>
                    <p>{job.location}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-lg font-bold text-musgo">{job.pay}</p>
                  <button className="bg-naranja-quemado text-white font-bold py-2 px-6 rounded-lg hover:bg-opacity-90 transition-transform transform hover:scale-105">
                    Aplicar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            {applicationHistory.map(app => (
              <div key={app.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{app.title}</h3>
                    <p className="text-gray-600 font-semibold">{app.farm}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full font-semibold text-sm ${app.bgColor} ${app.statusColor}`}>
                    <span>{app.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyApplicationsScreen;