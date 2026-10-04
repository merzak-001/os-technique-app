import React, { useState } from 'react';
import { 
  ShieldCheck, 
  User, 
  Lock, 
  ArrowRight, 
  CheckCircle2, 
  Activity, 
  HardHat, 
  Eye, 
  EyeOff,
  LogOut
} from 'lucide-react';

export default function App() {
  const [role, setRole] = useState('agent'); // 'agent' | 'responsable'
  const [username, setUsername] = useState('chouder');
  const [password, setPassword] = useState('••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  const presetUsers = {
    agent: [
      { name: 'chouder', label: 'Chouder M.', title: 'Opérateur Bancs & Étalonnage' },
      { name: 'sinacer', label: 'Sinacer M.', title: 'Contrôleur Qualité Réception' },
      { name: 'chenni', label: 'Chenni A.', title: 'Agent Montage & Ligne' },
    ],
    responsable: [
      { name: 'boudoukha', label: 'Boudoukha A.', title: 'Responsable Technique & Métrologie' },
      { name: 'direction', label: 'Directeur Prod.', title: 'Direction Production & Usine' },
    ]
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setUsername(presetUsers[newRole][0].name);
    setPassword('demo123');
  };

  const selectQuickAccount = (user) => {
    setUsername(user.name);
    setPassword('demo123');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const activeList = presetUsers[role];
      const match = activeList.find(u => u.name.toLowerCase() === username.toLowerCase()) || {
        name: username,
        label: username.toUpperCase(),
        title: role === 'responsable' ? 'Responsable Technique' : 'Agent Technique'
      };

      setLoggedInUser({
        ...match,
        role: role,
        loginTime: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })
      });
    }, 600);
  };

  const handleLogout = () => {
    setLoggedInUser(null);
  };

  return (
    <div style={{ width: '100%', maxWidth: '460px' }} className="animate-fade-in">
      {/* Top Brand Bar */}
      <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '54px',
          height: '54px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, rgba(8, 145, 178, 0.12) 0%, rgba(37, 99, 235, 0.12) 100%)',
          border: '1px solid rgba(8, 145, 178, 0.25)',
          boxShadow: '0 8px 24px rgba(8, 145, 178, 0.12)',
          marginBottom: '0.85rem'
        }}>
          <Activity size={28} color="#0891b2" />
        </div>
        <h1 style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#0f172a' }}>
          OS<span style={{ color: '#0891b2' }}>-Technique</span>
        </h1>
        <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
          Système Qualité, Métrologie & Contrôle de Production
        </p>
      </div>

      {/* Main Glass Card */}
      <div style={{
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '24px',
        padding: '2rem',
        boxShadow: '0 20px 45px -10px rgba(15, 23, 42, 0.08), 0 1px 3px rgba(15, 23, 42, 0.05)'
      }}>

        {!loggedInUser ? (
          <form onSubmit={handleLogin}>
            {/* Header */}
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#0891b2' }}>
                  Authentification
                </span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.7rem',
                  color: '#059669',
                  background: '#ecfdf5',
                  padding: '0.2rem 0.6rem',
                  borderRadius: '999px',
                  border: '1px solid #a7f3d0'
                }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#059669' }}></span>
                  SQL Server Connecté
                </span>
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginTop: '0.4rem', color: '#0f172a' }}>
                Connexion à votre espace
              </h2>
            </div>

            {/* Role Switcher Tabs */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.5rem',
              background: '#f1f5f9',
              padding: '0.35rem',
              borderRadius: '14px',
              border: '1px solid #e2e8f0',
              marginBottom: '1.35rem'
            }}>
              <button
                type="button"
                onClick={() => handleRoleChange('agent')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: role === 'agent' ? '#ffffff' : 'transparent',
                  color: role === 'agent' ? '#0284c7' : '#64748b',
                  boxShadow: role === 'agent' ? '0 2px 8px rgba(2, 132, 199, 0.15)' : 'none',
                  border: role === 'agent' ? '1px solid #bae6fd' : '1px solid transparent'
                }}
              >
                <HardHat size={16} />
                <span>Agent Terrain</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleChange('responsable')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  padding: '0.65rem 0.75rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: role === 'responsable' ? '#ffffff' : 'transparent',
                  color: role === 'responsable' ? '#059669' : '#64748b',
                  boxShadow: role === 'responsable' ? '0 2px 8px rgba(5, 150, 105, 0.15)' : 'none',
                  border: role === 'responsable' ? '1px solid #a7f3d0' : '1px solid transparent'
                }}
              >
                <ShieldCheck size={16} />
                <span>Responsable</span>
              </button>
            </div>

            {/* Quick Demo Selector Chips */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.72rem', color: '#94a3b8', marginBottom: '0.4rem', fontWeight: 600 }}>
                COMPTES DÉMO RAPIDES :
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {presetUsers[role].map((u) => (
                  <button
                    key={u.name}
                    type="button"
                    onClick={() => selectQuickAccount(u)}
                    style={{
                      background: username.toLowerCase() === u.name.toLowerCase() 
                        ? (role === 'agent' ? '#e0f2fe' : '#dcfce7') 
                        : '#f8fafc',
                      color: username.toLowerCase() === u.name.toLowerCase()
                        ? (role === 'agent' ? '#0284c7' : '#059669')
                        : '#475569',
                      border: username.toLowerCase() === u.name.toLowerCase()
                        ? (role === 'agent' ? '1px solid #7dd3fc' : '1px solid #86efac')
                        : '1px solid #e2e8f0',
                      padding: '0.3rem 0.65rem',
                      borderRadius: '8px',
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    {u.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.25rem' }}>
              {/* Username */}
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#334155', marginBottom: '0.4rem' }}>
                  Identifiant / Matricule
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8', display: 'flex' }}>
                    <User size={18} />
                  </span>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="ex. boudoukha, chouder..."
                    required
                    style={{
                      width: '100%',
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '0.75rem 1rem 0.75rem 2.75rem',
                      color: '#0f172a',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = role === 'agent' ? '#0891b2' : '#059669'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: '#334155' }}>
                    Mot de passe
                  </label>
                  <a href="#reset" onClick={(e) => { e.preventDefault(); alert("Réinitialisation : Contactez le support technique."); }} style={{ fontSize: '0.75rem', color: '#0891b2', textDecoration: 'none' }}>
                    Oublié ?
                  </a>
                </div>
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
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '12px',
                      padding: '0.75rem 2.75rem 0.75rem 2.75rem',
                      color: '#0f172a',
                      fontSize: '0.9rem',
                      outline: 'none',
                    }}
                    onFocus={(e) => e.target.style.borderColor = role === 'agent' ? '#0891b2' : '#059669'}
                    onBlur={(e) => e.target.style.borderColor = '#cbd5e1'}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '0.85rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'transparent',
                      border: 'none',
                      color: '#94a3b8',
                      cursor: 'pointer',
                      display: 'flex'
                    }}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{
                  width: '16px',
                  height: '16px',
                  accentColor: role === 'agent' ? '#0891b2' : '#059669',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="remember" style={{ fontSize: '0.8rem', color: '#64748b', cursor: 'pointer' }}>
                Mémoriser ma session sur ce poste
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                border: 'none',
                background: role === 'agent'
                  ? 'linear-gradient(135deg, #0891b2 0%, #0284c7 100%)'
                  : 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                color: '#ffffff',
                fontSize: '0.95rem',
                fontWeight: 700,
                cursor: isLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                boxShadow: role === 'agent'
                  ? '0 8px 20px rgba(8, 145, 178, 0.25)'
                  : '0 8px 20px rgba(5, 150, 105, 0.25)',
                opacity: isLoading ? 0.75 : 1
              }}
            >
              {isLoading ? (
                <span>Vérification des accès...</span>
              ) : (
                <>
                  <span>Accéder à l'Espace {role === 'agent' ? 'Terrain' : 'Responsable'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        ) : (
          /* Logged In State Prototype Screen */
          <div className="animate-fade-in" style={{ textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              background: loggedInUser.role === 'agent' ? '#e0f2fe' : '#dcfce7',
              border: loggedInUser.role === 'agent' ? '2px solid #0891b2' : '2px solid #059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1.2rem auto'
            }}>
              <CheckCircle2 size={32} color={loggedInUser.role === 'agent' ? '#0891b2' : '#059669'} />
            </div>

            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              color: loggedInUser.role === 'agent' ? '#0284c7' : '#059669',
              background: loggedInUser.role === 'agent' ? '#f0f9ff' : '#f0fdf4',
              padding: '0.25rem 0.75rem',
              borderRadius: '999px',
              border: loggedInUser.role === 'agent' ? '1px solid #bae6fd' : '1px solid #bbf7d0'
            }}>
              Session Active ({loggedInUser.role.toUpperCase()})
            </span>

            <h3 style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '0.8rem', color: '#0f172a' }}>
              Bienvenue, {loggedInUser.label}
            </h3>
            <p style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '0.2rem' }}>
              {loggedInUser.title}
            </p>

            {/* Quick Session Details Card */}
            <div style={{
              background: '#f8fafc',
              borderRadius: '14px',
              padding: '1rem',
              marginTop: '1.25rem',
              textAlign: 'left',
              border: '1px solid #e2e8f0',
              fontSize: '0.8rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Base de Données</span>
                <span style={{ color: '#0284c7', fontFamily: 'monospace', fontWeight: 600 }}>SQL Server (Local)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: '1px solid #e2e8f0' }}>
                <span style={{ color: '#64748b' }}>Heure de Connexion</span>
                <span style={{ color: '#0f172a', fontWeight: 600 }}>{loggedInUser.loginTime}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0' }}>
                <span style={{ color: '#64748b' }}>Modules Autorisés</span>
                <span style={{ color: '#059669', fontWeight: 600 }}>
                  {loggedInUser.role === 'responsable' ? 'Tous (Réception, Bancs, NC, Décisions)' : 'Saisie BR, Bancs, Déclaration NC'}
                </span>
              </div>
            </div>

            {/* Logout button */}
            <button
              type="button"
              onClick={handleLogout}
              style={{
                marginTop: '1.5rem',
                width: '100%',
                padding: '0.75rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#334155',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)'
              }}
            >
              <LogOut size={16} />
              <span>Changer d'utilisateur / Déconnexion</span>
            </button>
          </div>
        )}

      </div>

      {/* Footer Info */}
      <div style={{ textAlign: 'center', marginTop: '1.25rem', fontSize: '0.75rem', color: '#94a3b8' }}>
        <span>OS-Technique v1.0.0 • Prototype PC • Département Technique</span>
      </div>
    </div>
  );
}
