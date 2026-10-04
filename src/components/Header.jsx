import React from 'react';
import { RotateCw, Globe, ShieldCheck, HardHat, Bell } from 'lucide-react';

export default function Header({ title, subtitle, user, onRefresh }) {
  return (
    <header style={{
      height: '70px',
      backgroundColor: '#ffffff',
      borderBottom: '1px solid #e2e8f0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 10
    }}>
      {/* Left: Page Title & Subtitle + Department Tag */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <h1 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.01em' }}>
              {title}
            </h1>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              backgroundColor: '#ebf3ff',
              color: '#1d72fe',
              padding: '0.2rem 0.65rem',
              borderRadius: '999px',
              fontSize: '0.72rem',
              fontWeight: 700,
              border: '1px solid rgba(29, 114, 254, 0.2)'
            }}>
              🏢 Département : Technique
            </span>
          </div>
          {subtitle && (
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '0.15rem' }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Quick Actions & Role Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Sync Button */}
        <button
          type="button"
          onClick={onRefresh}
          title="Actualiser les données"
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#64748b'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f1f5f9'; e.currentTarget.style.color = '#1d72fe'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f8fafc'; e.currentTarget.style.color = '#64748b'; }}
        >
          <RotateCw size={16} />
        </button>

        {/* Language Badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          backgroundColor: '#f8fafc',
          border: '1px solid #e2e8f0',
          padding: '0.35rem 0.75rem',
          borderRadius: '999px',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: '#334155'
        }}>
          <Globe size={14} color="#64748b" />
          <span>FR Français</span>
        </div>

        {/* Active Role & User Pill */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          backgroundColor: user?.role === 'responsable' ? '#d1fae5' : '#ebf3ff',
          border: user?.role === 'responsable' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid rgba(29, 114, 254, 0.3)',
          color: user?.role === 'responsable' ? '#047857' : '#1d72fe',
          padding: '0.35rem 0.85rem',
          borderRadius: '999px',
          fontSize: '0.78rem',
          fontWeight: 700
        }}>
          {user?.role === 'responsable' ? <ShieldCheck size={15} /> : <HardHat size={15} />}
          <span>
            {user?.role === 'responsable' ? 'Responsable Qualité : ' : 'Agent Terrain : '}
            <strong style={{ color: '#0f172a' }}>{user?.name}</strong>
          </span>
        </div>
      </div>
    </header>
  );
}
