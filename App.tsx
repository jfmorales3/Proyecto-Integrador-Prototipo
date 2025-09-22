import React, { useState, useEffect } from 'react';
import { AppView, Transaction, TransactionStatus } from './types.ts';
import { useNetworkStatus } from './hooks/useNetworkStatus.ts';
import LandingScreen from './components/views/LandingScreen.tsx';
import WelcomeScreen from './components/views/WelcomeScreen.tsx';
import DashboardScreen from './components/views/DashboardScreen.tsx';
import JobInProgressScreen from './components/views/JobInProgressScreen.tsx';
import RoadReportScreen from './components/views/RoadReportScreen.tsx';
import ScanQRScreen from './components/views/ScanQRScreen.tsx';
import PaymentSuccessScreen from './components/views/PaymentSuccessScreen.tsx';
import TransactionHistoryScreen from './components/views/TransactionHistoryScreen.tsx';
import MyApplicationsScreen from './components/views/MyApplicationsScreen.tsx';
import { CloudIcon } from './components/icons.tsx';


const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.LANDING);
  const { isOnline, toggleNetworkStatus } = useNetworkStatus();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Simulate synchronization when connection is restored
  useEffect(() => {
    if (isOnline) {
      const pendingTransactions = transactions.filter(tx => tx.status === TransactionStatus.PENDING);
      if (pendingTransactions.length > 0) {
        setTimeout(() => {
          setTransactions(prev =>
            prev.map(tx =>
              tx.status === TransactionStatus.PENDING ? { ...tx, status: TransactionStatus.SYNCED } : tx
            )
          );
        }, 2000); // Delay to simulate network sync
      }
    }
  }, [isOnline, transactions]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions(prev => [...prev, transaction]);
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.LANDING:
        return <LandingScreen setView={setCurrentView} />;
      case AppView.WELCOME:
        return <WelcomeScreen setView={setCurrentView} isOnline={isOnline} />;
      case AppView.DASHBOARD:
        return <DashboardScreen setView={setCurrentView} />;
      case AppView.JOB_IN_PROGRESS:
        return <JobInProgressScreen setView={setCurrentView} isOnline={isOnline} />;
      case AppView.ROAD_REPORT:
        return <RoadReportScreen setView={setCurrentView} isOnline={isOnline} />;
      case AppView.SCAN_QR:
        return <ScanQRScreen setView={setCurrentView} addTransaction={addTransaction} />;
      case AppView.PAYMENT_SUCCESS:
        return <PaymentSuccessScreen setView={setCurrentView} lastTransaction={transactions[transactions.length - 1]} />;
      case AppView.TRANSACTION_HISTORY:
        return <TransactionHistoryScreen setView={setCurrentView} transactions={transactions} isOnline={isOnline}/>;
      case AppView.MY_APPLICATIONS:
        return <MyApplicationsScreen setView={setCurrentView} />;
      default:
        return <LandingScreen setView={setCurrentView} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex flex-col items-center justify-center p-4 font-sans">
      {/* Network Status Toggle for Demo */}
       <div className="w-full max-w-sm mb-2 flex items-center justify-center space-x-3 text-white">
          <CloudIcon isOnline={isOnline} className="w-8 h-8"/>
          <span className={`font-bold ${isOnline ? 'text-musgo' : 'text-naranja-quemado'}`}>
            {isOnline ? 'CONECTADO' : 'SIN CONEXIÓN'}
          </span>
          <button onClick={toggleNetworkStatus} className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm font-semibold">
              Cambiar
          </button>
       </div>
      
      {/* Mobile-like container */}
      <div className="relative w-full max-w-sm h-[80vh] max-h-[900px] bg-hueso shadow-2xl rounded-3xl overflow-hidden border-8 border-black">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-black rounded-b-xl z-20"></div>
        <div className="h-full w-full overflow-y-auto">
          {renderView()}
        </div>
      </div>
       <p className="text-white text-sm mt-2">Prototipo de JornalAPP</p>
    </div>
  );
};

export default App;