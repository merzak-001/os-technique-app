import React from 'react';
import { 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Gauge, 
  Layers, 
  Plus, 
  ArrowUpRight, 
  TrendingUp, 
  Sparkles,
  Calendar,
  Filter
} from 'lucide-react';

export default function DashboardView({ 
  benchesData, 
  receptions, 
  verifications, 
  nonConformites, 
  onNavigateTo,
  onOpenNewModal 
}) {
  // Compute global KPIs
  const totalMeters = benchesData.reduce((acc, row) => acc + row.total, 0);
  const totalBons = benchesData.reduce((acc, row) => acc + row.bon, 0);
  const totalHTPlus = benchesData.reduce((acc, row) => acc + row.htPlus, 0);
  const totalHTMinus = benchesData.reduce((acc, row) => acc + row.htMinus, 0);
  const totalBloque = benchesData.reduce((acc, row) => acc + row.bloque, 0);
  const fpyRate = totalMeters > 0 ? ((totalBons / totalMeters) * 100).toFixed(1) : 0;
  const activeNC = nonConformites.filter(nc => nc.statut.includes('En cours')).length;

  // Bench breakdown
  const benchStats = {
    'Banc Contagua': { bon: 0, total: 0 },
    'Banc B': { bon: 0, total: 0 },
    'Banc D': { bon: 0, total: 0 },
    'Banc E': { bon: 0, total: 0 }
  };

  benchesData.forEach(row => {
    if (benchStats[row.banc]) {
      benchStats[row.banc].bon += row.bon;
      benchStats[row.banc].total += row.total;
    }
  });

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      
      {/* 1. TOP ACTION BANNER (Exact style of Sensus SPA) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '1.25rem 1.75rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            backgroundColor: '#ebf3ff',
            color: '#1d72fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Vue d'Ensemble des Opérations Techniques & Qualité
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Surveillance temps réel des bancs d'étalonnage, réceptions composants et conformité globale.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenNewModal('production')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            backgroundColor: '#1d72fe',
            color: '#ffffff',
            padding: '0.65rem 1.25rem',
            borderRadius: '10px',
            fontSize: '0.85rem',
            fontWeight: 700,
            boxShadow: '0 4px 14px rgba(29, 114, 254, 0.3)'
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#155bd8'; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1d72fe'; }}
        >
          <Plus size={16} />
          <span>Nouveau Contrôle Lot</span>
        </button>
      </div>

      {/* 2. FILTER BAR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        fontSize: '0.8rem',
        color: '#475569',
        fontWeight: 600
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Calendar size={15} color="#1d72fe" />
          <span>PÉRIODE DES INDICATEURS KPI :</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <select style={{
            padding: '0.4rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#334155'
          }}>
            <option>Tous les mois (Année 2026)</option>
            <option>Septembre 2026</option>
            <option>Août 2026</option>
            <option>Juillet 2026</option>
          </select>

          <select style={{
            padding: '0.4rem 0.75rem',
            borderRadius: '8px',
            border: '1px solid #cbd5e1',
            backgroundColor: '#ffffff',
            fontSize: '0.78rem',
            fontWeight: 600,
            color: '#334155'
          }}>
            <option>Tous les Bancs (B, D, E, Contagua)</option>
            <option>Banc E (Ligne Simonfond)</option>
            <option>Banc D (Ligne Simonfond)</option>
            <option>Banc B (Ligne LA410)</option>
            <option>Banc Contagua</option>
          </select>
        </div>
      </div>

      {/* 3. 5 KPI CARDS IN A ROW */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {/* Card 1: Total Testés */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              TOTAL TESTÉS
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f172a', marginTop: '0.25rem' }}>
              {totalMeters.toLocaleString('fr-FR')}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#10b981', fontWeight: 600, marginTop: '0.25rem' }}>
              +100% traçabilité
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ebf3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d72fe' }}>
            <Layers size={17} />
          </div>
        </div>

        {/* Card 2: Bons 1er Coup */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              BONS 1ER COUP (FPY)
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#10b981', marginTop: '0.25rem' }}>
              {fpyRate}%
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>
              {totalBons.toLocaleString('fr-FR')} conformes
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#d1fae5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <CheckCircle2 size={17} />
          </div>
        </div>

        {/* Card 3: Hors Tolérance */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              HORS TOLÉRANCE
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#f59e0b', marginTop: '0.25rem' }}>
              {totalHTPlus + totalHTMinus}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#b45309', fontWeight: 600, marginTop: '0.25rem' }}>
              {totalHTMinus} Ht- • {totalHTPlus} HT+
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f59e0b' }}>
            <Gauge size={17} />
          </div>
        </div>

        {/* Card 4: Compteurs Bloqués */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              COMPTEURS BLOQUÉS
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#ef4444', marginTop: '0.25rem' }}>
              {totalBloque}
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '0.25rem' }}>
              Défaut pignon / serrage
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444' }}>
            <XCircle size={17} />
          </div>
        </div>

        {/* Card 5: Non-Conformités */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.25rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
              NC & DÉROGATIONS
            </span>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#8b5cf6', marginTop: '0.25rem' }}>
              {activeNC} <span style={{ fontSize: '0.9rem', color: '#64748b' }}>/ {nonConformites.length}</span>
            </div>
            <div style={{ fontSize: '0.72rem', color: '#8b5cf6', fontWeight: 600, marginTop: '0.25rem' }}>
              Action requise
            </div>
          </div>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8b5cf6' }}>
            <AlertTriangle size={17} />
          </div>
        </div>
      </div>

      {/* 4. VISUAL WIDGETS (3 Columns) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '1.25rem' }}>
        
        {/* Widget 1: Répartition par Statut Qualité */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp size={16} color="#1d72fe" />
              <span>Répartition des Résultats Qualité</span>
            </h3>
            <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Total : {totalMeters}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Bon */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Compteurs Conformes (Bon)</span>
                <span style={{ fontWeight: 700, color: '#10b981' }}>{totalBons} ({((totalBons/totalMeters)*100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(totalBons/totalMeters)*100}%`, height: '100%', backgroundColor: '#10b981', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Ht- */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Sous-comptage (Ht-)</span>
                <span style={{ fontWeight: 700, color: '#f59e0b' }}>{totalHTMinus} ({((totalHTMinus/totalMeters)*100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(totalHTMinus/totalMeters)*100}%`, height: '100%', backgroundColor: '#f59e0b', borderRadius: '999px' }} />
              </div>
            </div>

            {/* Bloqué */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Compteurs Bloqués Mécaniquement</span>
                <span style={{ fontWeight: 700, color: '#ef4444' }}>{totalBloque} ({((totalBloque/totalMeters)*100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(totalBloque/totalMeters)*100}%`, height: '100%', backgroundColor: '#ef4444', borderRadius: '999px' }} />
              </div>
            </div>

            {/* HT+ */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '0.3rem' }}>
                <span style={{ fontWeight: 600, color: '#334155' }}>Sur-comptage (HT+)</span>
                <span style={{ fontWeight: 700, color: '#3b82f6' }}>{totalHTPlus} ({((totalHTPlus/totalMeters)*100).toFixed(1)}%)</span>
              </div>
              <div style={{ width: '100%', height: '8px', backgroundColor: '#f1f5f9', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${(totalHTPlus/totalMeters)*100}%`, height: '100%', backgroundColor: '#3b82f6', borderRadius: '999px' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Widget 2: Performance par Banc */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
              Benchmark des Bancs
            </h3>
            <span style={{ fontSize: '0.72rem', color: '#1d72fe', fontWeight: 700 }}>FPY (%)</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {Object.keys(benchStats).map(name => {
              const b = benchStats[name];
              const rate = b.total > 0 ? ((b.bon / b.total) * 100).toFixed(1) : 0;
              const isLow = parseFloat(rate) < 88;
              return (
                <div key={name} style={{
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  backgroundColor: isLow ? '#fef2f2' : '#f8fafc',
                  border: isLow ? '1px solid #fee2e2' : '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <h5 style={{ fontSize: '0.82rem', fontWeight: 700, color: '#0f172a' }}>{name}</h5>
                    <p style={{ fontSize: '0.7rem', color: '#64748b' }}>{b.bon} / {b.total} compteurs</p>
                  </div>
                  <span style={{
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    color: isLow ? '#b91c1c' : '#047857',
                    backgroundColor: isLow ? '#fee2e2' : '#d1fae5',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px'
                  }}>
                    {rate}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Widget 3: Alertes Métrologiques & Primatest 2 */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          padding: '1.5rem',
          border: '1px solid #e2e8f0',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
              <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                Vérification Qmax Quotidienne
              </h3>
              <span className="badge badge-amber">Quart 15H</span>
            </div>

            <p style={{ fontSize: '0.78rem', color: '#64748b', lineHeight: 1.45, marginBottom: '1rem' }}>
              Étalonnage des bancs <strong>Qmax 2 & 3</strong> par rapport à l'étalon maître <strong>Primatest 2</strong>.
            </p>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '0.65rem',
              marginBottom: '1rem'
            }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.65rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>BIAIS MOYEN</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginTop: '0.1rem' }}>-0.66 %</div>
                <span style={{ fontSize: '0.65rem', color: '#10b981' }}>Décalage constant</span>
              </div>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.65rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 600 }}>DÉCROCHAGE MAX</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#b91c1c', marginTop: '0.1rem' }}>-1.40 %</div>
                <span style={{ fontSize: '0.65rem', color: '#ef4444' }}>Poste 2 & 13</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onNavigateTo('verifications')}
            style={{
              width: '100%',
              padding: '0.55rem',
              backgroundColor: '#ebf3ff',
              color: '#1d72fe',
              fontSize: '0.78rem',
              fontWeight: 700,
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.35rem'
            }}
          >
            <span>Consulter les relevés des 20 postes</span>
            <ArrowUpRight size={14} />
          </button>
        </div>

      </div>

      {/* 5. AI COPILOT QUICK ACTION PROMPTS */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        padding: '1.5rem',
        border: '1px solid #e2e8f0',
        boxShadow: 'var(--shadow-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '8px',
              background: 'linear-gradient(135deg, #1d72fe 0%, #8b5cf6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}>
              <Sparkles size={16} />
            </div>
            <h3 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f172a' }}>
              Assistant IA & Actions d'Audit Instantanées (Boutons Prompts)
            </h3>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>
            Analyses statistiques assistées par Gemini Pro
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem' }}>
          <button
            type="button"
            onClick={() => onNavigateTo('ai-copilot')}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1d72fe'; e.currentTarget.style.backgroundColor = '#ebf3ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
              🔍 Diagnostic Qualité Banc E
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Identifier les causes du rejet de 14.6% vs Contagua.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo('ai-copilot')}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1d72fe'; e.currentTarget.style.backgroundColor = '#ebf3ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
              🛠️ Plan d'Offset Métrologique
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Calculer le gain sur Ht- après recalage de +0.6%.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo('ai-copilot')}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1d72fe'; e.currentTarget.style.backgroundColor = '#ebf3ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
              📦 Audit Fournisseurs (SLR/Jostar)
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Historique des réclamations et dérogations 2026.
            </p>
          </button>

          <button
            type="button"
            onClick={() => onNavigateTo('ai-copilot')}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem'
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#1d72fe'; e.currentTarget.style.backgroundColor = '#ebf3ff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.backgroundColor = '#f8fafc'; }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#0f172a' }}>
              📄 Rapport Direction ISO
            </div>
            <p style={{ fontSize: '0.72rem', color: '#64748b' }}>
              Générer la synthèse mensuelle prête pour l'audit.
            </p>
          </button>
        </div>
      </div>

    </div>
  );
}
