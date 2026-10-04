import React, { useState } from 'react';
import { PackageCheck, Plus, Search, Filter, CheckCircle2, AlertTriangle, FileText, Calendar, Building, Check } from 'lucide-react';

export default function ReceptionView({ receptions, onAddReception, user }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSupplier, setFilterSupplier] = useState('ALL');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    designation: 'Tête laiton 3/4"',
    codeArticle: '48115600',
    noCommande: '45761005',
    fournisseur: 'SLR',
    quantite: 25000,
    unite: 'pce',
    bonReception: '5002223301',
    nqa: 'NQA 1.0 (Niveau II)',
    echantillon: 315,
    defautsTrouves: 0,
    observations: 'Cotes dimensionnelles et filetage conformes au plan.'
  });

  const filtered = receptions.filter(r => {
    const matchText = r.designation.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      r.codeArticle.includes(searchTerm) ||
                      r.bonReception.includes(searchTerm);
    const matchSupplier = filterSupplier === 'ALL' || r.fournisseur === filterSupplier;
    return matchText && matchSupplier;
  });

  const handleSave = (e) => {
    e.preventDefault();
    const isConforme = parseInt(formData.defautsTrouves, 10) <= 5;
    const newEntry = {
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      dateReception: new Date().toISOString().split('T')[0],
      duree: '1 j',
      statut: isConforme ? 'Conforme' : 'Non-Conforme',
      controleur: user?.name || 'Contrôleur Qualité',
      ...formData,
      quantite: parseInt(formData.quantite, 10),
      echantillon: parseInt(formData.echantillon, 10),
      defautsTrouves: parseInt(formData.defautsTrouves, 10)
    };
    onAddReception(newEntry);
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
            backgroundColor: '#ebf3ff',
            color: '#1d72fe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <PackageCheck size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Contrôle Réception des Composants & Matières (Procédure P-CE-01)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Enregistrement des Bons de Réception (BR), contrôle par échantillonnage NQA et réactivité fournisseurs.
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
          <span>Nouveau Bon de Réception (BR)</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '14px',
        padding: '0.85rem 1.25rem',
        border: '1px solid #e2e8f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <div style={{ position: 'relative', flex: 1, maxWidth: '380px' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '0.85rem', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Rechercher par désignation, code article, N° BR..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '0.55rem 0.75rem 0.55rem 2.4rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '0.78rem', color: '#64748b', fontWeight: 600 }}>Fournisseur :</span>
          <select
            value={filterSupplier}
            onChange={(e) => setFilterSupplier(e.target.value)}
            style={{
              padding: '0.5rem 0.85rem',
              borderRadius: '8px',
              border: '1px solid #cbd5e1',
              backgroundColor: '#ffffff',
              fontSize: '0.8rem',
              fontWeight: 600,
              color: '#334155'
            }}
          >
            <option value="ALL">Tous les Fournisseurs</option>
            <option value="SLR">SLR (Algérie)</option>
            <option value="Jostar China">Jostar China</option>
            <option value="Sensus Germany">Sensus Germany</option>
          </select>
        </div>
      </div>

      {/* Table Card */}
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
              <th style={{ padding: '0.85rem 1rem' }}>Date & BR</th>
              <th style={{ padding: '0.85rem 1rem' }}>Désignation Article</th>
              <th style={{ padding: '0.85rem 1rem' }}>Code Article</th>
              <th style={{ padding: '0.85rem 1rem' }}>Fournisseur</th>
              <th style={{ padding: '0.85rem 1rem' }}>Quantité</th>
              <th style={{ padding: '0.85rem 1rem' }}>Échantillon NQA</th>
              <th style={{ padding: '0.85rem 1rem' }}>Statut</th>
              <th style={{ padding: '0.85rem 1rem' }}>Contrôleur</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((row) => (
              <tr key={row.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <div style={{ fontWeight: 700, color: '#0f172a' }}>{row.bonReception}</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b' }}>{row.date} ({row.duree})</div>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 600, color: '#334155' }}>
                  {row.designation}
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{row.observations}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontFamily: 'monospace', fontWeight: 600, color: '#0284c7' }}>
                  {row.codeArticle}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{ fontWeight: 700, color: '#0f172a' }}>{row.fournisseur}</span>
                  <div style={{ fontSize: '0.7rem', color: '#64748b' }}>Cde: {row.noCommande}</div>
                </td>
                <td style={{ padding: '0.85rem 1rem', fontWeight: 700, color: '#0f172a' }}>
                  {row.quantite.toLocaleString('fr-FR')} {row.unite}
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  <span style={{ fontWeight: 600 }}>{row.echantillon} pièces</span>
                  <div style={{ fontSize: '0.7rem', color: row.defautsTrouves > 0 ? '#b91c1c' : '#047857' }}>
                    {row.defautsTrouves} défaut(s) trouvé(s)
                  </div>
                </td>
                <td style={{ padding: '0.85rem 1rem' }}>
                  {row.statut === 'Conforme' ? (
                    <span className="badge badge-green">
                      <CheckCircle2 size={13} />
                      Conforme
                    </span>
                  ) : (
                    <span className="badge badge-red">
                      <AlertTriangle size={13} />
                      Non-Conforme
                    </span>
                  )}
                </td>
                <td style={{ padding: '0.85rem 1rem', color: '#475569', fontWeight: 500 }}>
                  {row.controleur}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL : NOUVEAU BON DE RÉCEPTION */}
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
            maxWidth: '620px',
            padding: '2rem',
            boxShadow: 'var(--shadow-modal)',
            maxHeight: '90vh',
            overflowY: 'auto'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a' }}>
                  Nouveau Contrôle Réception (BR)
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748b' }}>
                  Saisie du Bon de Réception et échantillonnage selon procédure P-CE-01
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

            <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Désignation Article
                  </label>
                  <input
                    type="text"
                    value={formData.designation}
                    onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Code Article Sensus
                  </label>
                  <input
                    type="text"
                    value={formData.codeArticle}
                    onChange={(e) => setFormData({ ...formData, codeArticle: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', fontFamily: 'monospace' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Fournisseur
                  </label>
                  <select
                    value={formData.fournisseur}
                    onChange={(e) => setFormData({ ...formData, fournisseur: e.target.value })}
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                  >
                    <option value="SLR">SLR (Algérie)</option>
                    <option value="Jostar China">Jostar China</option>
                    <option value="Sensus Germany">Sensus Germany</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Quantité Livrée
                  </label>
                  <input
                    type="number"
                    value={formData.quantite}
                    onChange={(e) => setFormData({ ...formData, quantite: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    N° Bon Réception
                  </label>
                  <input
                    type="text"
                    value={formData.bonReception}
                    onChange={(e) => setFormData({ ...formData, bonReception: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem', backgroundColor: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Taille Échantillon Contrôlé (NQA)
                  </label>
                  <input
                    type="number"
                    value={formData.echantillon}
                    onChange={(e) => setFormData({ ...formData, echantillon: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                    Nombre de Défauts Trouvés
                  </label>
                  <input
                    type="number"
                    value={formData.defautsTrouves}
                    onChange={(e) => setFormData({ ...formData, defautsTrouves: e.target.value })}
                    required
                    style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', backgroundColor: '#ffffff' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '0.3rem' }}>
                  Observations & Décision
                </label>
                <textarea
                  rows={3}
                  value={formData.observations}
                  onChange={(e) => setFormData({ ...formData, observations: e.target.value })}
                  style={{ width: '100%', padding: '0.55rem 0.75rem', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.85rem', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
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
                  Enregistrer et Valider le BR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
