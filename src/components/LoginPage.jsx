import React, { useState } from 'react';
import { User, Lock, ArrowRight, Eye, EyeOff, ShieldCheck, HardHat, CheckCircle2, Sliders } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [role, setRole] = useState('responsable'); // 'agent' | 'responsable'
  const [username, setUsername] = useState('boudoukha');
  const [password, setPassword] = useState('demo123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const presetAccounts = {
    responsable: [
      { id: 'boudoukha', name: 'Boudoukha A.', title: 'Responsable Technique & Métrologie' },
      { id: 'direction', name: 'Directeur Prod.', title: 'Direction Production' }
    ],
    agent: [
      { id: 'chouder', name: 'Chouder M.', title: 'Opérateur Bancs & Étalonnage' },
      { id: 'sinacer', name: 'Sinacer M.', title: 'Contrôleur Qualité Réception' },
      { id: 'abbas', name: 'Abbas M.', title: 'Agent Production Banc D/E' },
      { id: 'chenni', name: 'Chenni A.', title: 'Agent Montage Ligne' }
    ]
  };

  const handleRoleSwitch = (newRole) => {
    setRole(newRole);
    setUsername(presetAccounts[newRole][0].id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const userList = presetAccounts[role];
      const found = userList.find(u => u.id.toLowerCase() === username.toLowerCase()) || {
        id: username,
        name: username.toUpperCase(),
        title: role === 'responsable' ? 'Responsable Technique' : 'Agent Technique'
      };
      onLogin({
        ...found,
        role: role,
        loginTime: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    }, 450);
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#0c1a2e',
      padding: '2rem 1.5rem',
      position: 'relative'
    }}>
      {/* Background Top Dark Navy, Bottom Soft Gray effect matching design */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '45vh',
        backgroundColor: '#0c1a2e',
        zIndex: 0
      }} />
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '55vh',
        backgroundColor: '#eef2f6',
        zIndex: 0
      }} />

      {/* Main Dual Card Container */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        width: '100%',
        maxWidth: '960px',
        minHeight: '520px',
        display: 'grid',
        gridTemplateColumns: '1.05fr 1fr',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 25px 50px -12px rgba(12, 26, 46, 0.35), 0 0 1px 1px rgba(0,0,0,0.06)'
      }}>

        {/* LEFT CARD : Dark Navy Corporate Branding */}
        <div style={{
          backgroundColor: '#0c1a2e',
          color: '#ffffff',
          padding: '3rem 2.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          borderRight: '1px solid rgba(255, 255, 255, 0.05)'
        }}>
          <div>
            {/* Logo Badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', marginBottom: '2.5rem' }}>
              <div style={{
                width: '52px',
                height: '52px',
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '4px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                overflow: 'hidden'
              }}>
                <img 
                  src="/sensus.jpg" 
                  alt="Sensus Logo" 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
                />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '0.04em', textTransform: 'uppercase', color: '#ffffff' }}>
                  SENSUS SPA
                </h3>
                <p style={{ fontSize: '0.72rem', color: '#38bdf8', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  DÉPARTEMENT TECHNIQUE
                </p>
              </div>
            </div>

            {/* Title & Description */}
            <h1 style={{ fontSize: '1.95rem', fontWeight: 800, lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
              Système Qualité &<br />Métrologie des Bancs
            </h1>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: 1.55, marginBottom: '2rem' }}>
              Plateforme unifiée de suivi des contrôles de réception, étalonnages des bancs de test, traçabilité de production et traitement des non-conformités.
            </p>

            {/* Feature Pills */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.65rem 1rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                color: '#e2e8f0',
                fontWeight: 500
              }}>
                <CheckCircle2 size={16} color="#38bdf8" />
                <span>Suivi métrologique & vérification des bancs Qmax / Qt</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.65rem 1rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                color: '#e2e8f0',
                fontWeight: 500
              }}>
                <CheckCircle2 size={16} color="#38bdf8" />
                <span>Contrôle réception composants & échantillonnage NQA</span>
              </div>

              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.65rem',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.65rem 1rem',
                borderRadius: '12px',
                fontSize: '0.82rem',
                color: '#e2e8f0',
                fontWeight: 500
              }}>
                <CheckCircle2 size={16} color="#38bdf8" />
                <span>Gestion des dérogations et actions correctives (CAPA)</span>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2rem' }}>
            © 2026 Sensus SPA • Système d’Information Technique v2.4
          </div>
        </div>

        {/* RIGHT CARD : Clean Crisp White Login Form */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '3rem 2.75rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ marginBottom: '1.75rem' }}>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
              Connexion à votre espace
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.25rem' }}>
              Saisissez vos identifiants pour continuer
            </p>
          </div>

          {/* Role Switcher Pill Bar */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            backgroundColor: '#f1f5f9',
            padding: '4px',
            borderRadius: '12px',
            marginBottom: '1.35rem'
          }}>
            <button
              type="button"
              onClick={() => handleRoleSwitch('responsable')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                padding: '0.55rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                backgroundColor: role === 'responsable' ? '#ffffff' : 'transparent',
                color: role === 'responsable' ? '#1d72fe' : '#64748b',
                boxShadow: role === 'responsable' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <ShieldCheck size={16} />
              <span>Responsable</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleSwitch('agent')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                padding: '0.55rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 700,
                backgroundColor: role === 'agent' ? '#ffffff' : 'transparent',
                color: role === 'agent' ? '#1d72fe' : '#64748b',
                boxShadow: role === 'agent' ? '0 2px 6px rgba(0,0,0,0.06)' : 'none'
              }}
            >
              <HardHat size={16} />
              <span>Agent Terrain</span>
            </button>
          </div>

          {/* Quick Demo Accounts Chips */}
          <div style={{ marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
              Comptes rapides disponibles :
            </div>
            <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
              {presetAccounts[role].map(u => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUsername(u.id)}
                  style={{
                    backgroundColor: username === u.id ? '#ebf3ff' : '#f8fafc',
                    color: username === u.id ? '#1d72fe' : '#475569',
                    border: username === u.id ? '1px solid #1d72fe' : '1px solid #e2e8f0',
                    padding: '0.3rem 0.6rem',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 600
                  }}
                >
                  {u.name}
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
            {/* Username */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Nom d'utilisateur
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                  <User size={18} />
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Nom d'utilisateur (ex: boudoukha)"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 1rem 0.75rem 2.65rem',
                    fontSize: '0.88rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#1d72fe'; e.target.style.backgroundColor = '#ffffff'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.backgroundColor = '#f8fafc'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '0.4rem' }}>
                Mot de passe
              </label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                  <Lock size={18} />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  style={{
                    width: '100%',
                    padding: '0.75rem 2.65rem 0.75rem 2.65rem',
                    fontSize: '0.88rem',
                    borderRadius: '12px',
                    border: '1px solid #e2e8f0',
                    backgroundColor: '#f8fafc',
                    color: '#0f172a',
                    outline: 'none'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#1d72fe'; e.target.style.backgroundColor = '#ffffff'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.backgroundColor = '#f8fafc'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '0.85rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#94a3b8',
                    display: 'flex'
                  }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: '12px',
                backgroundColor: '#1d72fe',
                color: '#ffffff',
                fontSize: '0.92rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: '0 8px 20px rgba(29, 114, 254, 0.28)',
                marginTop: '0.5rem',
                opacity: isLoading ? 0.75 : 1
              }}
            >
              {isLoading ? (
                <span>Connexion en cours...</span>
              ) : (
                <>
                  <span>Se Connecter</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
