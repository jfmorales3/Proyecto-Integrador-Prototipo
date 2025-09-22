import React from 'react';
import { AppView, Transaction, TransactionStatus } from '../../types.ts';
import { AlertTriangleIcon, ArrowLeftIcon, CheckCircleIcon, ClockIcon } from '../icons.tsx';

interface TransactionHistoryScreenProps {
  setView: (view: AppView) => void;
  transactions: Transaction[];
  isOnline: boolean;
}

const StatusLabel: React.FC<{ status: TransactionStatus }> = ({ status }) => {
    const statusMap = {
        [TransactionStatus.SYNCED]: {
            icon: <CheckCircleIcon className="w-5 h-5 mr-2" />,
            bgColor: 'bg-musgo/20',
            textColor: 'text-musgo',
        },
        [TransactionStatus.PENDING]: {
            icon: <ClockIcon className="w-5 h-5 mr-2" />,
            bgColor: 'bg-ocre/20',
            textColor: 'text-ocre',
        },
        [TransactionStatus.ERROR]: {
            icon: <AlertTriangleIcon className="w-5 h-5 mr-2" />,
            bgColor: 'bg-naranja-quemado/20',
            textColor: 'text-naranja-quemado',
        },
    };
    const { icon, bgColor, textColor } = statusMap[status];

    return (
        <div className={`flex items-center justify-center px-3 py-1 rounded-full font-semibold text-sm ${bgColor} ${textColor}`}>
            {icon}
            <span>{status}</span>
        </div>
    );
};


const TransactionHistoryScreen: React.FC<TransactionHistoryScreenProps> = ({ setView, transactions, isOnline }) => {
  return (
    <div className="flex flex-col h-full w-full bg-hueso">
      <header className="flex items-center p-6 bg-white shadow-sm sticky top-0">
        <button onClick={() => setView(AppView.DASHBOARD)} className="p-2 rounded-full hover:bg-musgo-claro/50">
          <ArrowLeftIcon className="w-6 h-6 text-gray-800"/>
        </button>
        <h1 className="text-2xl font-bold text-gray-800 ml-4">Mis Pagos</h1>
      </header>

      <main className="flex-grow p-6 space-y-4 overflow-y-auto">
        {isOnline && (
            <div className="p-3 bg-musgo/20 text-musgo rounded-lg text-center font-semibold">
                Sincronizando pagos...
            </div>
        )}
        {transactions.length === 0 ? (
            <div className="text-center pt-20">
                <p className="text-xl text-gray-600">Aún no tienes pagos registrados.</p>
            </div>
        ) : (
            [...transactions].reverse().map(tx => (
                <div key={tx.id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-xl font-bold text-gray-800">{tx.payer}</p>
                            <p className="text-gray-500">{tx.date}</p>
                        </div>
                        <p className="text-2xl font-bold text-gray-900">
                            {new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(tx.amount)}
                        </p>
                    </div>
                    <div className="mt-3 flex justify-end">
                       <StatusLabel status={tx.status} />
                    </div>
                </div>
            ))
        )}
      </main>
    </div>
  );
};

export default TransactionHistoryScreen;