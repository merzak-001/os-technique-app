import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import ReceptionView from './components/ReceptionView';
import VerificationsView from './components/VerificationsView';
import ProductionView from './components/ProductionView';
import NonConformitesView from './components/NonConformitesView';
import ECMEView from './components/ECMEView';
import AICopilotView from './components/AICopilotView';

import { 
  INITIAL_RECEPTIONS, 
  INITIAL_BENCHES_DATA, 
  INITIAL_VERIFICATIONS, 
  INITIAL_NON_CONFORMITES, 
  INITIAL_ECME 
} from './data/mockData';

export default function App() {
  // Session State
  const [currentUser, setCurrentUser] = useState({
    id: 'boudoukha',
    name: 'Boudoukha A.',
    title: 'Responsable Technique & Métrologie',
    role: 'responsable',
    loginTime: '15:20'
  });

  const [activeTab, setActiveTab] = useState('dashboard');

  // Master Data State
  const [receptions, setReceptions] = useState(INITIAL_RECEPTIONS);
  const [benchesData, setBenchesData] = useState(INITIAL_BENCHES_DATA);
  const [verifications, setVerifications] = useState(INITIAL_VERIFICATIONS);
  const [nonConformites, setNonConformites] = useState(INITIAL_NON_CONFORMITES);
  const [ecmeList, setEcmeList] = useState(INITIAL_ECME);

  // Tab Titles mapping
  const tabTitles = {
    dashboard: { title: 'Tableau de Bord — Performance & Statistiques', subtitle: 'Vue globale des indicateurs qualité, métrologie et cadence de production' },
    reception: { title: 'Contrôle Réception des Matières & Pièces (BR)', subtitle: 'Procédure P-CE-01 • Échantillonnage NQA et réactivité fournisseurs' },
    verifications: { title: 'Vérification Métrologique des Bancs Qmax', subtitle: 'Contrôles début de quart (09H / 15H) p/p Étalon Maître Primatest 2' },
    production: { title: 'Suivi Production & Rendement des Bancs', subtitle: 'Procédure P-CE-02 • Taux Bon 1er Coup (FPY) et typologie des rejets' },
    nonconformites: { title: 'Traitement des Non-Conformités & Dérogations', subtitle: 'Procédure P-CE-03 • Isolement, retouches, dérogations et actions CAPA' },
    ecme: { title: 'Parc Métrologique & Fiches de Vie (ECME)', subtitle: 'Inventaire des équipements de mesure, jauges volumétriques et étalonnages' },
    'ai-copilot': { title: 'Assistant IA & Actions d\'Audit Instantanées', subtitle: 'Analyses statistiques pré-paramétrées et rapports direction par Gemini Pro' }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleSwitchRole = () => {
    if (!currentUser) return;
    const newRole = currentUser.role === 'responsable' ? 'agent' : 'responsable';
    setCurrentUser({
      id: newRole === 'responsable' ? 'boudoukha' : 'chouder',
      name: newRole === 'responsable' ? 'Boudoukha A.' : 'Chouder M.',
      title: newRole === 'responsable' ? 'Responsable Technique & Métrologie' : 'Opérateur Bancs & Étalonnage',
      role: newRole,
      loginTime: currentUser.loginTime
    });
  };

  // Add Handlers
  const handleAddReception = (newEntry) => {
    setReceptions([newEntry, ...receptions]);
  };

  const handleAddBatch = (newEntry) => {
    setBenchesData([newEntry, ...benchesData]);
  };

  const handleAddVerification = (newEntry) => {
    setVerifications([newEntry, ...verifications]);
  };

  const handleAddNC = (newEntry) => {
    setNonConformites([newEntry, ...nonConformites]);
  };

  const handleApproveDerogation = (ncId, visaName) => {
    setNonConformites(nonConformites.map(nc => {
      if (nc.id === ncId) {
        return {
          ...nc,
          statut: 'Clôturée (Dérogation accordée)',
          visaResponsable: visaName,
          dateCloture: new Date().toISOString().split('T')[0]
        };
      }
      return nc;
    }));
  };

  // If not logged in, render LoginPage
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const currentHeaderInfo = tabTitles[activeTab] || { title: 'Système Technique', subtitle: '' };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6fa' }}>
      {/* 1. LEFT SIDEBAR */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        user={currentUser}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
      />

      {/* 2. RIGHT MAIN CONTENT AREA */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, height: '100vh', overflowY: 'auto' }}>
        {/* Sticky Header Bar */}
        <Header
          title={currentHeaderInfo.title}
          subtitle={currentHeaderInfo.subtitle}
          user={currentUser}
          onRefresh={() => {}}
        />

        {/* Dynamic Body Content */}
        <main style={{ padding: '1.75rem 2rem 3rem 2rem', flex: 1 }}>
          {activeTab === 'dashboard' && (
            <DashboardView
              benchesData={benchesData}
              receptions={receptions}
              verifications={verifications}
              nonConformites={nonConformites}
              onNavigateTo={setActiveTab}
              onOpenNewModal={(type) => setActiveTab(type)}
            />
          )}

          {activeTab === 'reception' && (
            <ReceptionView
              receptions={receptions}
              onAddReception={handleAddReception}
              user={currentUser}
            />
          )}

          {activeTab === 'verifications' && (
            <VerificationsView
              verifications={verifications}
              onAddVerification={handleAddVerification}
              user={currentUser}
            />
          )}

          {activeTab === 'production' && (
            <ProductionView
              benchesData={benchesData}
              onAddBatch={handleAddBatch}
              user={currentUser}
            />
          )}

          {activeTab === 'nonconformites' && (
            <NonConformitesView
              nonConformites={nonConformites}
              onAddNC={handleAddNC}
              onApproveDerogation={handleApproveDerogation}
              user={currentUser}
            />
          )}

          {activeTab === 'ecme' && (
            <ECMEView
              ecmeList={ecmeList}
              onAddECME={(newECME) => setEcmeList([newECME, ...ecmeList])}
              user={currentUser}
            />
          )}

          {activeTab === 'ai-copilot' && (
            <AICopilotView
              benchesData={benchesData}
              receptions={receptions}
              verifications={verifications}
              nonConformites={nonConformites}
              user={currentUser}
            />
          )}
        </main>
      </div>
    </div>
  );
}
