import React, { useState } from 'react';
import { Activity, Plus, CheckCircle2, AlertCircle, XCircle, Gauge, Calendar, User, Search } from 'lucide-react';

export default function ProductionView({ benchesData, onAddBatch, user }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedBenchFilter, setSelectedBenchFilter] = useState('ALL');

  // New Batch Form State
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    minuterie: '15/07/2026 B',
    banc: 'Banc E',
    ligne: 'Assemblage Simonfond',
    bon: 235,
    htPlus: 4,
    htMinus: 12,
    bloque: 9,
    total: 260,
    agentBanc: user?.name || 'Chouder M.',
    agentQmax: 'Safsaf T.',
    anomalie: 'RAS, fonctionnement nominal.'
  });

  const handleCalcTotal = (bon, htPlus, htMinus, bloque) => {
    return (parseInt(bon, 10) || 0) + (parseInt(htPlus, 10) || 0) + (parseInt(htMinus, 10) || 0) + (parseInt(bloque, 10) || 0);
  };

  const handleNumberChange = (field, val) => {
    const num = parseInt(val, 10) || 0;
    const updated = { ...formData, [field]: num };
    const autoTotal = handleCalcTotal(
      field === 'bon' ? num : updated.bon,
      field === 'htPlus' ? num : updated.htPlus,
      field === 'htMinus' ? num : updated.htMinus,
      field === 'bloque' ? num : updated.bloque
    );
    updated.total = autoTotal;
    setFormData(updated);
  };

  const handleSaveBatch = (e) => {
    e.preventDefault();
    const fpy = formData.total > 0 ? parseFloat(((formData.bon / formData.total) * 100).toFixed(2)) : 0;
    const newEntry = {
      id: `LOT-${formData.date.replace(/-/g, '')}-${formData.banc.replace(/\s+/g, '')}`,
      ...formData,
      fpy,
      statut: 'Terminé'
    };
    onAddBatch(newEntry);
    setShowModal(false);
  };

  const filtered = benchesData.filter(b => selectedBenchFilter === 'ALL' || b.banc === selectedBenchFilter);

  return (
    <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      
      {/* Top Banner */}
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
            backgroundColor: '#d1fae5',
            color: '#047857',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Activity size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Suivi de Production & Rendement Bancs (Procédure P-CE-02)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Saisie des résultats d'étalonnage des lots, calcul instantané du FPY (Bons 1er Coup) et détection des rejets.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowModal(true)}
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
          <span>Saisie Nouveau Lot</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '0.85rem 1.25rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Filtrer par Banc :</span>
          <select
            value={selectedBenchFilter}
            onChange={(e) => setSelectedBenchFilter(e.target.value)}
            style={{
              padding: '0.45rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <option value="ALL">Tous les Bancs</option>
            <option value="Banc E">Banc E (Simonfond)</option>
            <option value="Banc D">Banc D (Simonfond)</option>
            <option value="Banc B">Banc B (LA410)</option>
            <option value="Banc Contagua">Banc Contagua (LA410)</option>
          </select>
        </div>

        <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
          Total lots affichés : <strong>{filtered.length}</strong>
        </span>
      </div>

      {/* Table */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-card)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
              <th style={{ padding: '0.85rem 1rem' }}>Lot & Date</th>
              <th style={{ padding: '0.85rem 1rem' }}>Banc & Ligne</th>
              <th style={{ padding: '0.85rem 1rem' }}>Total Lot</th>
              <th style={{ padding: '0.85rem 1rem' }}>Bon (FPY %)</th>
              <th style={{ padding: '0.85rem 1rem' }}>HT+</th>
              <th style={{ padding: '0.85rem 1rem' }}>Ht-</th>
              <th style={{ padding: '0.85rem 1rem' }}>Bloqué</th>
              <th style={{ padding: '0.85rem 1rem' }}>Opérateurs</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a' }}>{row.id}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{row.date} • Lot: {row.minuterie}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{row.banc}</span>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>{row.ligne}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 800, fontSize: '0.95rem', color: '#0f172a' }}>
                  {row.total} pces
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{ fontWeight: 800, color: '#10b981', fontSize: '0.92rem' }}>
                    {row.bon}
                  </span>
                  <span style={{
                    marginLeft: '0.4rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.15rem 0.45rem',
                    borderRadius: '4px',
                    backgroundColor: row.fpy < 88 ? '#fee2e2' : '#d1fae5',
                    color: row.fpy < 88 ? '#b91c1c' : '#047857'
                  }}>
                    {row.fpy}%
                  </span>
                </td>
                <td style={{ padding: '0.85rem 1rem', color: row.htPlus > 0 ? '#b45309' : '#64748b', fontWeight: row.htPlus > 0 ? 700 : 400 }}>
                  {row.htPlus}
                </td>
                <td style={{ padding: '0.85rem 1rem', color: row.htMinus > 10 ? '#b91c1c' : '#b45309', fontWeight: row.htMinus > 0 ? 700 : 400 }}>
                  {row.htMinus}
                </td>
                <td style={{ padding: '0.85rem 1rem', color: row.bloque > 10 ? '#b91c1c' : (row.bloque > 0 ? '#ef4444' : '#64748b'), fontWeight: row.bloque > 0 ? 800 : 400 }}>
                  {row.bloque}
                </td>
                <td style={{ padding: '0.85rem 1rem', fontSize: '0.74rem', color: '#475569' }}>
                  <div>Banc: <strong>{row.agentBanc}</strong></div>
                  <div>Qmax: <strong>{row.agentQmax}</strong></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL : NOUVELLE SAISIE LOT PRODUCTION */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(12, 26, 46, 0.65)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '640px',
            padding: '2rem',
            boxShadow: 'var(--shadow-modal)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Saisie Contrôle Lot sur Banc d'Étalonnage
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Contrôle Bon du 1er coup, dérives tolérance et blocages mécaniques
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ fontSize: '1.2rem', color: '#94a3b8', padding: '0.25rem' }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveBatch} style={{ display: 'flex', flexDirection: 'column', gap: '1.15rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Banc de Test
                  </label>
                  <select
                    value={formData.banc}
                    onChange={(e) => setFormData({ ...formData, banc: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem' }}
                  >
                    <option value="Banc E">Banc E</option>
                    <option value="Banc D">Banc D</option>
                    <option value="Banc B">Banc B</option>
                    <option value="Banc Contagua">Banc Contagua</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Lot / Minuterie
                  </label>
                  <input
                    type="text"
                    value={formData.minuterie}
                    onChange={(e) => setFormData({ ...formData, minuterie: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Ligne d'Assemblage
                  </label>
                  <select
                    value={formData.ligne}
                    onChange={(e) => setFormData({ ...formData, ligne: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem' }}
                  >
                    <option value="Assemblage Simonfond">Assemblage Simonfond</option>
                    <option value="Assemblage LA410">Assemblage LA410</option>
                    <option value="Compteurs 420PC">Compteurs 420PC</option>
                  </select>
                </div>
              </div>

              {/* Number Inputs Grid */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a' }}>
                    Ventilation des Résultats du Lot
                  </span>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1d72fe', backgroundColor: '#ebf3ff', padding: '0.2rem 0.65rem', borderRadius: '6px' }}>
                    Total Calculé : {formData.total} pièces
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#047857', marginBottom: '0.3rem' }}>
                      Bons (Conformes)
                    </label>
                    <input
                      type="number"
                      value={formData.bon}
                      onChange={(e) => handleNumberChange('bon', e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '2px solid #10b981', fontSize: '1rem', fontWeight: 800, textAlign: 'center', color: '#047857' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#b45309', marginBottom: '0.3rem' }}>
                      HT+ (Sur-comptage)
                    </label>
                    <input
                      type="number"
                      value={formData.htPlus}
                      onChange={(e) => handleNumberChange('htPlus', e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', fontWeight: 700, textAlign: 'center' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#b45309', marginBottom: '0.3rem' }}>
                      Ht- (Sous-comptage)
                    </label>
                    <input
                      type="number"
                      value={formData.htMinus}
                      onChange={(e) => handleNumberChange('htMinus', e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', fontWeight: 700, textAlign: 'center' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: '#b91c1c', marginBottom: '0.3rem' }}>
                      Bloqués
                    </label>
                    <input
                      type="number"
                      value={formData.bloque}
                      onChange={(e) => handleNumberChange('bloque', e.target.value)}
                      required
                      style={{ width: '100%', padding: '0.65rem', borderRadius: '8px', border: '2px solid #ef4444', fontSize: '1rem', fontWeight: 800, textAlign: 'center', color: '#b91c1c' }}
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Agent Banc
                  </label>
                  <input
                    type="text"
                    value={formData.agentBanc}
                    onChange={(e) => setFormData({ ...formData, agentBanc: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Agent Qmax
                  </label>
                  <input
                    type="text"
                    value={formData.agentQmax}
                    onChange={(e) => setFormData({ ...formData, agentQmax: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', backgroundColor: '#1d72fe', color: '#ffffff', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  Enregistrer le Lot
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
