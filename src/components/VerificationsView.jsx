import React, { useState } from 'react';
import { Gauge, Plus, CheckCircle2, AlertTriangle, Activity, Sliders, Calendar, ArrowUpRight } from 'lucide-react';

export default function VerificationsView({ verifications, onAddVerification, user }) {
  const [selectedVerif, setSelectedVerif] = useState(verifications[0]);
  const [showModal, setShowModal] = useState(false);

  // New Verification Modal State (10 slots for Qmax2, 10 slots for Qmax3)
  const [modalData, setFormData] = useState({
    quart: '09H',
    agentQmax2: user?.name || 'Morad Sinacer',
    agentQmax3: 'Abd Samad',
    debitNominal: '2.75 à 2.90 m³/h',
    etalonReference: 'Primatest 2',
    q2Slots: [-0.65, -0.70, -0.60, -0.75, -0.55, -0.60, -0.70, -0.65, -0.50, -0.75],
    q3Slots: [-0.60, -0.65, -0.70, -0.60, -0.55, -0.75, -0.65, -0.60, -0.50, -0.70],
    observation: 'Vérification normale en début de quart.'
  });

  const handleSlotChange = (bench, index, val) => {
    const num = parseFloat(val) || 0;
    if (bench === 'q2') {
      const copy = [...modalData.q2Slots];
      copy[index] = num;
      setFormData({ ...modalData, q2Slots: copy });
    } else {
      const copy = [...modalData.q3Slots];
      copy[index] = num;
      setFormData({ ...modalData, q3Slots: copy });
    }
  };

  const handleSaveVerif = (e) => {
    e.preventDefault();
    const allVals = [...modalData.q2Slots, ...modalData.q3Slots];
    const mean = allVals.reduce((a, b) => a + b, 0) / allVals.length;
    const variance = allVals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / allVals.length;
    const std = Math.sqrt(variance);
    const hasOutlier = allVals.some(v => Math.abs(v) > 1.2);

    const newEntry = {
      id: `VERIF-${new Date().toISOString().split('T')[0]}-${modalData.quart}`,
      date: new Date().toISOString().split('T')[0],
      quart: modalData.quart,
      bancTest: 'Qmax 2 & Qmax 3',
      etalonReference: modalData.etalonReference,
      debitNominal: modalData.debitNominal,
      agentQmax2: modalData.agentQmax2,
      agentQmax3: modalData.agentQmax3,
      valeursQmax2: modalData.q2Slots,
      valeursQmax3: modalData.q3Slots,
      ecartMoyen: parseFloat(mean.toFixed(3)),
      ecartType: parseFloat(std.toFixed(3)),
      statut: hasOutlier ? 'Alerte Dérive' : 'Conforme',
      observation: modalData.observation
    };

    onAddVerification(newEntry);
    setSelectedVerif(newEntry);
    setShowModal(false);
  };

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
            backgroundColor: '#fef3c7',
            color: '#b45309',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Gauge size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Vérification Métrologique des Bancs Qmax 2 & 3 (Primatest 2)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Contrôle par quart (09H / 15H), détection des dérives poste par poste et calcul du biais systématique.
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
          <span>Saisie Début de Quart</span>
        </button>
      </div>

      {/* Grid: Left Historical List / Right Detailed Slot Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr', gap: '1.25rem' }}>
        
        {/* Left: Verifications Log */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          padding: '1.25rem',
          boxShadow: 'var(--shadow-card)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem'
        }}>
          <h3 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
            Historique des Fiches de Quart
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            {verifications.map((v) => {
              const isSelected = selectedVerif?.id === v.id;
              const isAlert = v.statut === 'Alerte Dérive';
              return (
                <div
                  key={v.id}
                  onClick={() => setSelectedVerif(v)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    border: isSelected ? '2px solid #1d72fe' : '1px solid #e2e8f0',
                    backgroundColor: isSelected ? '#ebf3ff' : '#ffffff',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.35rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>
                      {v.date} — Quart {v.quart}
                    </span>
                    <span className={`badge ${isAlert ? 'badge-amber' : 'badge-green'}`}>
                      {v.statut}
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: '#64748b' }}>
                    <span>Agents: {v.agentQmax2} / {v.agentQmax3}</span>
                    <span style={{ fontWeight: 700, color: '#0f172a' }}>Moyenne: {v.ecartMoyen}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Detailed 20 Slots Matrix Viewer */}
        {selectedVerif && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.25rem'
          }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <div>
                <span className="badge badge-blue">Réf: {selectedVerif.id}</span>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
                  Contrôle du {selectedVerif.date} (Quart {selectedVerif.quart})
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Étalon : <strong>{selectedVerif.etalonReference}</strong> • Débit : <strong>{selectedVerif.debitNominal}</strong>
                </p>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>ÉCART-TYPE DISPERSION (σ)</div>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: selectedVerif.ecartType > 0.3 ? '#b91c1c' : '#047857' }}>
                  {selectedVerif.ecartType} %
                </div>
              </div>
            </div>

            {/* Qmax 2 (Slots 1 to 10) */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                  🔹 Banc Qmax 2 (Postes 1 à 10) — Agent : {selectedVerif.agentQmax2}
                </h4>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
                {selectedVerif.valeursQmax2.map((val, idx) => {
                  const isHigh = Math.abs(val) >= 1.0;
                  return (
                    <div key={idx} style={{
                      backgroundColor: isHigh ? '#fef2f2' : '#f8fafc',
                      border: isHigh ? '1px solid #fee2e2' : '1px solid #e2e8f0',
                      borderRadius: '10px',
                      padding: '0.65rem 0.5rem',
                      textAlign: 'center'
                    }}>
                      <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Poste N°{idx + 1}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isHigh ? '#b91c1c' : '#0f172a', marginTop: '0.15rem' }}>
                        {val > 0 ? `+${val}` : val}%
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Qmax 3 (Slots 11 to 20) */}
            {selectedVerif.valeursQmax3.length > 0 && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0f172a' }}>
                    🔹 Banc Qmax 3 (Postes 11 à 20) — Agent : {selectedVerif.agentQmax3}
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.6rem' }}>
                  {selectedVerif.valeursQmax3.map((val, idx) => {
                    const isHigh = Math.abs(val) >= 1.0;
                    return (
                      <div key={idx} style={{
                        backgroundColor: isHigh ? '#fef2f2' : '#f8fafc',
                        border: isHigh ? '1px solid #fee2e2' : '1px solid #e2e8f0',
                        borderRadius: '10px',
                        padding: '0.65rem 0.5rem',
                        textAlign: 'center'
                      }}>
                        <div style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Poste N°{idx + 11}</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: isHigh ? '#b91c1c' : '#0f172a', marginTop: '0.15rem' }}>
                          {val > 0 ? `+${val}` : val}%
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Observation Card */}
            <div style={{
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              borderRadius: '12px',
              padding: '0.85rem 1rem',
              fontSize: '0.8rem',
              color: '#334155'
            }}>
              <strong>Note Métrologique :</strong> {selectedVerif.observation}
            </div>
          </div>
        )}

      </div>

      {/* MODAL : NOUVELLE VÉRIFICATION DE QUART */}
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
            maxWidth: '750px',
            padding: '2rem',
            boxShadow: 'var(--shadow-modal)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Saisie Contrôle Métrologique Début de Quart
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Relevé des erreurs relatives Qmax (%) par rapport à Primatest 2
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

            <form onSubmit={handleSaveVerif} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Quart de Vérification
                  </label>
                  <select
                    value={modalData.quart}
                    onChange={(e) => setFormData({ ...modalData, quart: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem' }}
                  >
                    <option value="09H">Quart du Matin (09H)</option>
                    <option value="15H">Quart de l'Après-midi (15H)</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Agent Qmax 2
                  </label>
                  <input
                    type="text"
                    value={modalData.agentQmax2}
                    onChange={(e) => setFormData({ ...modalData, agentQmax2: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Agent Qmax 3
                  </label>
                  <input
                    type="text"
                    value={modalData.agentQmax3}
                    onChange={(e) => setFormData({ ...modalData, agentQmax3: e.target.value })}
                    style={{ width: '100%', padding: '0.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              {/* Slot Inputs Grid Qmax 2 */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                  Valeurs Qmax 2 (Postes 1 à 10 en %)
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                  {modalData.q2Slots.map((val, idx) => (
                    <div key={idx}>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: '#64748b' }}>Poste {idx + 1}</label>
                      <input
                        type="number"
                        step="0.01"
                        value={val}
                        onChange={(e) => handleSlotChange('q2', idx, e.target.value)}
                        style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', textAlign: 'center' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Slot Inputs Grid Qmax 3 */}
              <div style={{ backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.6rem' }}>
                  Valeurs Qmax 3 (Postes 11 à 20 en %)
                </h5>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.5rem' }}>
                  {modalData.q3Slots.map((val, idx) => (
                    <div key={idx}>
                      <label style={{ display: 'block', fontSize: '0.68rem', color: '#64748b' }}>Poste {idx + 11}</label>
                      <input
                        type="number"
                        step="0.01"
                        value={val}
                        onChange={(e) => handleSlotChange('q3', idx, e.target.value)}
                        style={{ width: '100%', padding: '0.35rem', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '0.85rem', textAlign: 'center' }}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Observations & Conclusion
                </label>
                <input
                  type="text"
                  value={modalData.observation}
                  onChange={(e) => setFormData({ ...modalData, observation: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
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
                  Enregistrer la Vérification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
