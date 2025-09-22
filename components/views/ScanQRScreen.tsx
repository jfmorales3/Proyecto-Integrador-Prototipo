import React, { useEffect, useState } from 'react';
import { AppView, Transaction, TransactionStatus } from '../../types.ts';
import { ArrowLeftIcon, FlashlightIcon } from '../icons.tsx';

interface ScanQRScreenProps {
  setView: (view: AppView) => void;
  addTransaction: (transaction: Transaction) => void;
}

const ScanQRScreen: React.FC<ScanQRScreenProps> = ({ setView, addTransaction }) => {
    const [isScanning, setIsScanning] = useState(false);
    
    const handleScan = () => {
        setIsScanning(true);
        // Simulate scanning and local validation
        setTimeout(() => {
            const newTransaction: Transaction = {
                id: `txn_${Date.now()}`,
                date: new Date().toLocaleDateString('es-CO'),
                payer: 'Finca La Esperanza',
                amount: 50000,
                status: TransactionStatus.PENDING,
            };
            addTransaction(newTransaction);
            setView(AppView.PAYMENT_SUCCESS);
        }, 2000);
    };

    return (
    <div className="relative flex flex-col h-full w-full bg-gray-900 text-white p-6">
      <header className="flex items-center justify-between z-10">
        <button onClick={() => setView(AppView.JOB_IN_PROGRESS)} className="p-2 rounded-full bg-black/30 hover:bg-black/50">
          <ArrowLeftIcon className="w-6 h-6"/>
        </button>
        <h1 className="text-xl font-bold">Recibir Pago</h1>
        <button className="p-2 rounded-full bg-black/30 hover:bg-black/50">
          <FlashlightIcon className="w-6 h-6"/>
        </button>
      </header>
      
      <main className="flex-grow flex flex-col items-center justify-center z-10">
        <p className="text-lg text-center mb-4">Apunta la cámara al código QR de tu contratante</p>
        <div className="relative w-64 h-64">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-musgo rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-musgo rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-musgo rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-musgo rounded-br-lg"></div>
            {isScanning && <div className="absolute inset-0 bg-musgo/50 flex items-center justify-center rounded-lg animate-pulse">
                <p className="font-bold">Escaneando...</p>
            </div>}
        </div>
        <button 
            onClick={handleScan}
            disabled={isScanning}
            className="mt-8 bg-musgo-claro text-gray-900 font-bold py-3 px-8 rounded-lg text-lg disabled:opacity-50"
        >
            {isScanning ? 'Procesando...' : 'Simular Escaneo'}
        </button>
      </main>
      
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <p className="absolute bottom-4 text-center w-full left-0 text-sm text-gray-300 z-10">Esto es una simulación de la cámara.</p>
    </div>
  );
};

export default ScanQRScreen;