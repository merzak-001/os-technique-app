import React from 'react';
import { 
  LayoutDashboard, 
  PackageCheck, 
  Gauge, 
  Activity, 
  AlertTriangle, 
  SlidersHorizontal, 
  Bot, 
  KeyRound, 
  LogOut,
  UserCheck
} from 'lucide-react';

export default function Sidebar({ activeTab, onSelectTab, user, onLogout, onSwitchRole }) {
  const navItems = [
    { id: 'dashboard', label: 'Tableau de Bord', icon: LayoutDashboard },
    { id: 'reception', label: 'Contrôle Réception BR', icon: PackageCheck },
    { id: 'verifications', label: 'Vérification Bancs Qmax', icon: Gauge },
    { id: 'production', label: 'Suivi Production Bancs', icon: Activity },
    { id: 'nonconformites', label: 'Non-Conformités (NC)', icon: AlertTriangle },
    { id: 'ecme', label: 'Parc Métrologie & ECME', icon: SlidersHorizontal },
    { id: 'ai-copilot', label: 'Copilot IA & Audits', icon: Bot, isAIBadge: true },
  ];

  return (
    <aside style={{
      width: '260px',
      backgroundColor: '#0b1626',
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100vh',
      position: 'sticky',
      top: 0,
      flexShrink: 0,
      borderRight: '1px solid #1e293b',
      padding: '1.25rem 0.85rem'
    }}>
      {/* TOP SECTION */}
      <div>
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0 0.5rem 1.25rem 0.5rem' }}>
          <div style={{
            width: '42px',
            height: '42px',
            backgroundColor: '#ffffff',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            overflow: 'hidden'
          }}>
            <img 
              src="/sensus.jpg" 
              alt="Sensus Logo" 
              style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
            />
          </div>
          <div>
            <h2 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#ffffff', letterSpacing: '0.02em', textTransform: 'uppercase' }}>
              SENSUS SPA
            </h2>
            <p style={{ fontSize: '0.68rem', color: '#38bdf8', fontWeight: 600 }}>
              Suivi Technique & Qualité
            </p>
          </div>
        </div>

        {/* User Card */}
        <div style={{
          backgroundColor: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '14px',
          padding: '0.75rem 0.85rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: user?.role === 'responsable' ? '#10b981' : '#1d72fe',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 800,
            fontSize: '0.95rem',
            flexShrink: 0
          }}>
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div style={{ overflow: 'hidden' }}>
            <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#f8fafc' }} className="text-truncate">
              {user?.name || 'Utilisateur'}
            </h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', marginTop: '0.1rem' }}>
              <span style={{
                fontSize: '0.65rem',
                color: user?.role === 'responsable' ? '#34d399' : '#38bdf8',
                fontWeight: 600
              }}>
                {user?.role === 'responsable' ? 'Responsable' : 'Agent Terrain'}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: isActive ? '#1d72fe' : 'transparent',
                  color: isActive ? '#ffffff' : '#94a3b8',
                  fontSize: '0.82rem',
                  fontWeight: isActive ? 700 : 500,
                  boxShadow: isActive ? '0 4px 14px rgba(29, 114, 254, 0.35)' : 'none'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.color = '#ffffff';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#94a3b8';
                  }
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <Icon size={17} color={isActive ? '#ffffff' : '#94a3b8'} />
                  <span>{item.label}</span>
                </div>
                {item.isAIBadge && (
                  <span style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : 'rgba(56, 189, 248, 0.2)',
                    color: isActive ? '#ffffff' : '#38bdf8',
                    padding: '0.15rem 0.45rem',
                    borderRadius: '999px'
                  }}>
                    IA PRO
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM ACTION LINKS */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '1rem' }}>
        <button
          type="button"
          onClick={onSwitchRole}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.76rem',
            color: '#94a3b8',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.color = '#ffffff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.color = '#94a3b8'; }}
        >
          <UserCheck size={15} />
          <span>Basculer de rôle</span>
        </button>

        <button
          type="button"
          onClick={onLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 0.75rem',
            borderRadius: '8px',
            fontSize: '0.76rem',
            color: '#f87171',
            textAlign: 'left'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; }}
        >
          <LogOut size={15} />
          <span>Déconnexion</span>
        </button>
      </div>
    </aside>
  );
}
