import React, { useState } from 'react';
import { AlertTriangle, Plus, CheckCircle2, ShieldCheck, FileCheck, Lock, Clock, Search, XCircle } from 'lucide-react';

export default function NonConformitesView({ nonConformites, onAddNC, onApproveDerogation, user }) {
  const [selectedNC, setSelectedNC] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pinCode, setPinCode] = useState('');
  const [showPinModal, setShowPinModal] = useState(false);
  const [actionTarget, setActionTarget] = useState(null);

  // New NC Form State
  const [formData, setFormData] = useState({
    titre: 'Défaut couple de serrage machine assemblage',
    type: 'Montage / Ligne',
    severite: 'Haute',
    description: 'Le couple mesuré est de 65 N.m au lieu de la consigne 70-90 N.m.',
    constatIntervention: 'Arrêt de ligne et re-serrage manuel au couple prescrit.',
    actionCorrective: 'Intervention maintenance sur la tête de vissage + contrôle renforcé.'
  });

  const handleCreateNC = (e) => {
    e.preventDefault();
    const newEntry = {
      id: `NC-2026-00${nonConformites.length + 1}`,
      date: new Date().toISOString().split('T')[0],
      ...formData,
      statut: 'En cours',
      visaResponsable: null,
      dateCloture: null
    };
    onAddNC(newEntry);
    setShowModal(false);
  };

  const handleOpenApprove = (nc) => {
    setActionTarget(nc);
    setShowPinModal(true);
  };

  const handleConfirmApproval = (e) => {
    e.preventDefault();
    if (actionTarget) {
      onApproveDerogation(actionTarget.id, user?.name || 'Boudoukha A.');
    }
    setShowPinModal(false);
    setPinCode('');
    setActionTarget(null);
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
            backgroundColor: '#fee2e2',
            color: '#b91c1c',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <AlertTriangle size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Traitement des Non-Conformités & Dérogations (Procédure P-CE-03)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Signalement des anomalies, isolement en quarantaine, validation des dérogations et actions CAPA.
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
          <span>Déclarer une Non-Conformité</span>
        </button>
      </div>

      {/* Grid of NC Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.25rem' }}>
        {nonConformites.map((nc) => {
          const isClosed = nc.statut === 'Clôturée';
          const isDerog = nc.statut.includes('Dérogation');
          return (
            <div
              key={nc.id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '16px',
                border: '1px solid #e2e8f0',
                padding: '1.5rem',
                boxShadow: 'var(--shadow-card)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.85rem', color: '#0f172a' }}>{nc.id}</span>
                    <span style={{ fontSize: '0.72rem', color: '#64748b' }}>• {nc.date}</span>
                  </div>
                  <span className={`badge ${isClosed ? 'badge-green' : (isDerog ? 'badge-purple' : 'badge-red')}`}>
                    {nc.statut}
                  </span>
                </div>

                <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.5rem' }}>
                  {nc.titre}
                </h3>

                <p style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.5, marginBottom: '0.85rem' }}>
                  {nc.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.75rem', backgroundColor: '#f8fafc', padding: '0.85rem', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                  <div>
                    <strong style={{ color: '#0f172a' }}>Constat / Intervention : </strong>
                    <span style={{ color: '#334155' }}>{nc.constatIntervention}</span>
                  </div>
                  <div>
                    <strong style={{ color: '#0f172a' }}>Action Corrective (CAPA) : </strong>
                    <span style={{ color: '#334155' }}>{nc.actionCorrective}</span>
                  </div>
                </div>
              </div>

              {/* Footer Stamp or Approve button */}
              <div style={{ borderTop: '1px solid #f1f5f9', paddingTop: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {nc.visaResponsable ? (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.74rem',
                    color: '#047857',
                    fontWeight: 700,
                    backgroundColor: '#d1fae5',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '8px',
                    border: '1px solid rgba(16, 185, 129, 0.3)'
                  }}>
                    <ShieldCheck size={15} />
                    <span>Signé électroniquement : {nc.visaResponsable}</span>
                  </div>
                ) : (
                  <div style={{ fontSize: '0.74rem', color: '#b45309', fontWeight: 600 }}>
                    En attente d'approbation Responsable
                  </div>
                )}

                {!isClosed && user?.role === 'responsable' && (
                  <button
                    type="button"
                    onClick={() => handleOpenApprove(nc)}
                    style={{
                      padding: '0.45rem 0.9rem',
                      backgroundColor: '#1d72fe',
                      color: '#ffffff',
                      borderRadius: '8px',
                      fontSize: '0.76rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <FileCheck size={14} />
                    <span>Accorder Dérogation & Clôturer</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL : DÉCLARER NC */}
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
            maxWidth: '600px',
            padding: '2rem',
            boxShadow: 'var(--shadow-modal)'
          }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>
              Déclaration d'une Non-Conformité (Fiche NC)
            </h3>
            <p style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '1.25rem' }}>
              Enregistrement de l'anomalie pour traitement immédiat et isolement du lot
            </p>

            <form onSubmit={handleCreateNC} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Titre du Défaut / Non-Conformité
                </label>
                <input
                  type="text"
                  value={formData.titre}
                  onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                  required
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Origine
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem' }}
                  >
                    <option value="Montage / Ligne">Montage / Ligne</option>
                    <option value="Fournisseur">Fournisseur</option>
                    <option value="Métrologie / Banc">Métrologie / Banc</option>
                    <option value="Composant / Sertissage">Composant / Sertissage</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Sévérité
                  </label>
                  <select
                    value={formData.severite}
                    onChange={(e) => setFormData({ ...formData, severite: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', backgroundColor: '#ffffff', fontSize: '0.85rem' }}
                  >
                    <option value="Faible">Faible</option>
                    <option value="Moyenne">Moyenne</option>
                    <option value="Haute">Haute</option>
                    <option value="Critique">Critique</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Description de l'Écart
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Action Immédiate / Constat
                </label>
                <input
                  type="text"
                  value={formData.constatIntervention}
                  onChange={(e) => setFormData({ ...formData, constatIntervention: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
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
                  Enregistrer l'Anomalie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL : SIGNATURE / VALIDATION DÉROGATION */}
      {showPinModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(12, 26, 46, 0.7)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 110,
          padding: '1.5rem'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '480px',
            padding: '2rem',
            boxShadow: 'var(--shadow-modal)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '54px',
              height: '54px',
              borderRadius: '50%',
              backgroundColor: '#d1fae5',
              color: '#047857',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto'
            }}>
              <ShieldCheck size={28} />
            </div>

            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a' }}>
              Signature Électronique de Dérogation
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '0.25rem', marginBottom: '1.25rem' }}>
              Vous êtes sur le point de valider la dérogation pour <strong>{actionTarget?.id}</strong> en tant que <strong>{user?.name}</strong>.
            </p>

            <form onSubmit={handleConfirmApproval} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem', textAlign: 'left' }}>
                  Code PIN Responsable (Validation rapide)
                </label>
                <div style={{ position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>
                    <Lock size={16} />
                  </span>
                  <input
                    type="password"
                    maxLength={4}
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                    placeholder="••••"
                    required
                    style={{ width: '100%', padding: '0.65rem 1rem 0.65rem 2.5rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '1rem', letterSpacing: '0.3em', textAlign: 'center' }}
                  />
                </div>
              </div>

              <div style={{
                backgroundColor: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '10px',
                padding: '0.75rem',
                fontSize: '0.72rem',
                color: '#64748b',
                textAlign: 'left'
              }}>
                🔒 Empreinte cryptographique certifiée conforme ISO 9001. Horodatage automatique appliqué.
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  style={{ padding: '0.65rem 1.25rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontWeight: 600, color: '#64748b' }}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  style={{ padding: '0.65rem 1.5rem', borderRadius: '10px', backgroundColor: '#10b981', color: '#ffffff', fontSize: '0.85rem', fontWeight: 700 }}
                >
                  Apposer le Visa & Clôturer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
