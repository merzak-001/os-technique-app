import React, { useState } from 'react';
import { SlidersHorizontal, Plus, CheckCircle2, AlertTriangle, Calendar, ShieldCheck, Clock, FileText } from 'lucide-react';

export default function ECMEView({ ecmeList, onAddECME, user }) {
  const [showModal, setShowModal] = useState(false);
  const [selectedECME, setSelectedECME] = useState(ecmeList[0]);

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
            backgroundColor: '#ebf3ff',
            color: '#1d72fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <SlidersHorizontal size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Parc Métrologie & Équipements de Contrôle (ECME)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Gestion des fiches de vie, planning des étalonnages périodiques, jauges volumétriques et manomètres étalons.
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
          <span>Ajouter un Équipement</span>
        </button>
      </div>

      {/* Grid: Table on Left / Fiche de Vie on Right */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '1.25rem' }}>
        
        {/* Table of ECME */}
        <div style={{
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px solid #e2e8f0',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-card)'
        }}>
          <div style={{ padding: '1rem 1.25rem', borderBottom: '1px solid #e2e8f0', fontWeight: 800, fontSize: '0.9rem', color: '#0f172a' }}>
            Planning de Vérification & Étalonnage
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: 700 }}>
                <th style={{ padding: '0.85rem 1rem' }}>Code & Équipement</th>
                <th style={{ padding: '0.85rem 1rem' }}>Localisation</th>
                <th style={{ padding: '0.85rem 1rem' }}>Dernier Étal.</th>
                <th style={{ padding: '0.85rem 1rem' }}>Prochaine Échéance</th>
                <th style={{ padding: '0.85rem 1rem' }}>Statut</th>
              </tr>
            </thead>
            <tbody>
              {ecmeList.map((e) => {
                const isSelected = selectedECME?.id === e.id;
                const isWarning = e.statut.includes('Échéance');
                return (
                  <tr
                    key={e.id}
                    onClick={() => setSelectedECME(e)}
                    style={{
                      borderBottom: '1px solid #f1f5f9',
                      backgroundColor: isSelected ? '#ebf3ff' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <div style={{ fontWeight: 800, color: '#0f172a' }}>{e.designation}</div>
                      <div style={{ fontSize: '0.72rem', fontFamily: 'monospace', color: '#0284c7' }}>{e.code}</div>
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#475569' }}>
                      {e.lieu}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', color: '#64748b' }}>
                      {e.dernierEtalonnage}
                    </td>
                    <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: isWarning ? '#b91c1c' : '#0f172a' }}>
                      {e.prochainEtalonnage}
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className={`badge ${isWarning ? 'badge-amber' : 'badge-green'}`}>
                        {e.statut}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Fiche de Vie Detail Card */}
        {selectedECME && (
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            padding: '1.5rem',
            boxShadow: 'var(--shadow-card)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
              <span className="badge badge-blue">Document N° 3.111.120</span>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
                Fiche de Vie : {selectedECME.designation}
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                Code équipement : <strong style={{ fontFamily: 'monospace' }}>{selectedECME.code}</strong>
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', fontSize: '0.8rem' }}>
              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>VALEUR NOMINALE</span>
                <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{selectedECME.volumeNominal}</div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>INCERTITUDE TYPE (uMT)</span>
                <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{selectedECME.incertitude}</div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>PÉRIODICITÉ ÉTALONNAGE</span>
                <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{selectedECME.periodicite}</div>
              </div>

              <div style={{ backgroundColor: '#f8fafc', padding: '0.75rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                <span style={{ fontSize: '0.7rem', color: '#64748b' }}>RESPONSABLE SUIVI</span>
                <div style={{ fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>{selectedECME.responsable}</div>
              </div>
            </div>

            {/* Calibration Certificate stamp */}
            <div style={{
              backgroundColor: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem'
            }}>
              <ShieldCheck size={26} color="#16a34a" />
              <div>
                <h5 style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534' }}>
                  Constat de Vérification Valide
                </h5>
                <p style={{ fontSize: '0.72rem', color: '#15803d' }}>
                  Étalonnage interne conforme selon procédure P-ML-02/00. Traçabilité raccordée étalon national.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
}
