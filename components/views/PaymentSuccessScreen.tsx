import React from 'react';
import { AppView, Transaction } from '../../types.ts';
import { CheckCircleIcon } from '../icons.tsx';

interface PaymentSuccessScreenProps {
  setView: (view: AppView) => void;
  lastTransaction?: Transaction;
}

const PaymentSuccessScreen: React.FC<PaymentSuccessScreenProps> = ({ setView, lastTransaction }) => {
  if (!lastTransaction) {
    // Fallback if there's no transaction data
    return (
        <div className="flex flex-col items-center justify-center h-full w-full bg-hueso p-6 text-center">
            <p className="text-lg text-naranja-quemado">No se encontró la última transacción.</p>
            <button onClick={() => setView(AppView.DASHBOARD)} className="mt-4 bg-musgo text-hueso font-bold py-3 px-6 rounded-lg">
                Volver al Inicio
            </button>
        </div>
    );
  }

  const formattedAmount = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(lastTransaction.amount);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-hueso p-8 text-center">
      <div className="flex-grow flex flex-col items-center justify-center">
        <CheckCircleIcon className="w-24 h-24 text-musgo mb-6" />
        
        <h1 className="text-4xl font-bold text-gray-800">¡Pago Registrado!</h1>
        <p className="text-5xl font-bold text-gray-900 my-4">{formattedAmount}</p>

        <p className="text-xl text-gray-600">De: <span className="font-semibold">{lastTransaction.payer}</span></p>

        <div className="mt-8 bg-ocre/20 border border-ocre p-3 rounded-lg">
          <p className="text-xl font-bold text-ocre">Estado: {lastTransaction.status}</p>
          <p className="text-sm text-gray-700">El pago se ha guardado en tu dispositivo y se sincronizará automáticamente.</p>
        </div>
      </div>

      <button
        onClick={() => setView(AppView.TRANSACTION_HISTORY)}
        className="w-full bg-musgo text-hueso text-xl font-bold py-4 mt-8 rounded-lg shadow-md transition-transform transform hover:scale-105"
      >
        Ver Mis Transacciones
      </button>
    </div>
  );
};

export default PaymentSuccessScreen;