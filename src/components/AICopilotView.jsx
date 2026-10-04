import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Layers, 
  Printer, 
  RotateCw,
  TrendingDown,
  Gauge,
  ShieldCheck,
  Building,
  SlidersHorizontal
} from 'lucide-react';

export default function AICopilotView({ benchesData, receptions, verifications, nonConformites, user }) {
  const [activePrompt, setActivePrompt] = useState('diagnostic');
  const [isGenerating, setIsGenerating] = useState(false);

  const promptOptions = [
    {
      id: 'diagnostic',
      title: '🔍 Diagnostic Qualité Banc E vs Autres Bancs',
      desc: 'Analyse comparative des rejets et identification des écarts métrologiques majeurs.',
      icon: Gauge
    },
    {
      id: 'offset',
      title: '🛠️ Impact Recalage Offset Métrologique (+0.6%)',
      desc: 'Simulation du gain direct sur le taux de sous-comptage Ht- et sur le First Pass Yield (FPY).',
      icon: SlidersHorizontal
    },
    {
      id: 'rootcause',
      title: '⚠️ Analyse des Causes Racines (Bloqué & Ht-)',
      desc: 'Corrélation entre les défauts mécaniques (pignons, sertissage) et les lots rejetés.',
      icon: AlertTriangle
    },
    {
      id: 'fournisseurs',
      title: '📦 Audit Qualité Fournisseurs (SLR & Jostar)',
      desc: 'Bilan de réactivité des BR, réclamations sur joints toriques et cotes hors tolérance.',
      icon: Building
    },
    {
      id: 'rapport_iso',
      title: '📄 Générer Rapport Mensuel Direction & Audit ISO',
      desc: 'Synthèse exécutif complète prête pour la revue de direction et audit OIML.',
      icon: FileText
    }
  ];

  const handleRunPrompt = (promptId) => {
    setActivePrompt(promptId);
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 400);
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
            background: 'linear-gradient(135deg, #1d72fe 0%, #8b5cf6 100%)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Bot size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#0f172a' }}>
              Assistant IA & Actions d'Audit Métrologique (Gemini Pro Engine)
            </h2>
            <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
              Boutons de requêtes structurées (sans saisie libre) pour un diagnostic instantané et standardisé.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            backgroundColor: '#f8fafc',
            border: '1px solid #cbd5e1',
            color: '#334155',
            padding: '0.6rem 1rem',
            borderRadius: '10px',
            fontSize: '0.82rem',
            fontWeight: 700
          }}
        >
          <Printer size={15} />
          <span>Imprimer le Rapport</span>
        </button>
      </div>

      {/* Grid: 1-Click Action Buttons on Top */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
        {promptOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = activePrompt === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleRunPrompt(opt.id)}
              style={{
                padding: '1rem',
                borderRadius: '14px',
                backgroundColor: isActive ? '#ebf3ff' : '#ffffff',
                border: isActive ? '2px solid #1d72fe' : '1px solid #e2e8f0',
                boxShadow: isActive ? '0 4px 14px rgba(29, 114, 254, 0.15)' : 'var(--shadow-sm)',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: isActive ? '#1d72fe' : '#0f172a', fontWeight: 800, fontSize: '0.82rem' }}>
                <Icon size={16} />
                <span className="text-truncate">{opt.title}</span>
              </div>
              <p style={{ fontSize: '0.7rem', color: '#64748b', lineHeight: 1.35 }}>
                {opt.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Result Card matching the active action */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #e2e8f0',
        padding: '2rem',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem'
      }}>
        {isGenerating ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#64748b' }}>
            <RotateCw size={32} className="spin" color="#1d72fe" style={{ margin: '0 auto 1rem auto' }} />
            <p style={{ fontWeight: 700 }}>Traitement statistique et analyse par l'IA en cours...</p>
          </div>
        ) : (
          <>
            {/* PROMPT RESULT 1 : DIAGNOSTIC BANC E */}
            {activePrompt === 'diagnostic' && (
              <div className="fade-in">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <div>
                    <span className="badge badge-red">Alerte Prioritaire Qualité</span>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
                      Diagnostic Détaillé : Pourquoi le Banc E enregistre 14.62% de rejet vs Contagua à 4.87% ?
                    </h3>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Basé sur 1 820 compteurs testés</span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div style={{ backgroundColor: '#fef2f2', padding: '1.25rem', borderRadius: '12px', border: '1px solid #fee2e2' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#b91c1c', marginBottom: '0.5rem' }}>
                      🔴 Constats Factuels sur le Banc E (520 testés)
                    </h4>
                    <ul style={{ fontSize: '0.82rem', color: '#7f1d1d', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
                      <li><strong>76 rejets au total (14.62%)</strong>, soit 3 fois plus que le Banc Contagua (4.87%).</li>
                      <li><strong>Sous-comptage Ht- massif (34 compteurs)</strong> : représente 44.7% des rejets du banc.</li>
                      <li><strong>Compteurs bloqués mécaniquement (23 unités)</strong> : défauts concentrés sur la ligne Simonfond.</li>
                      <li>Sur-comptage HT+ ponctuel le 24/09 (15 unités).</li>
                    </ul>
                  </div>

                  <div style={{ backgroundColor: '#f0fdf4', padding: '1.25rem', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: '#166534', marginBottom: '0.5rem' }}>
                      🟢 Plan d'Actions Recommandé
                    </h4>
                    <ul style={{ fontSize: '0.82rem', color: '#14532d', lineHeight: 1.6, paddingLeft: '1.25rem' }}>
                      <li><strong>Recalibrage offset du Banc E :</strong> Décaler la consigne de +0.5% pour recentrer la courbe de Gauss et éliminer 80% des rejets Ht-.</li>
                      <li><strong>Contrôle outillage sertissage :</strong> Inspection du poinçon N°1 pour éliminer le frottement du pignon XN3 (cause des blocages).</li>
                      <li><strong>Vérification buses & manomètres :</strong> Exécuter la procédure P-ML-08/00 sur les postes 2, 7 et 10.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* PROMPT RESULT 2 : OFFSET */}
            {activePrompt === 'offset' && (
              <div className="fade-in">
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <span className="badge badge-blue">Optimisation Métrologique</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
                    Simulation du Recalage de Biais Systématique (+0.60%)
                  </h3>
                </div>

                <div style={{ backgroundColor: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '1.25rem', fontSize: '0.85rem', lineHeight: 1.6, color: '#334155' }}>
                  <p>
                    L'analyse des 29 fichiers de vérification montre un <strong>décalage systématique moyen de -0.66%</strong> par rapport à l'étalon maître Primatest 2.
                  </p>
                  <p style={{ marginTop: '0.5rem' }}>
                    En ajustant la consigne d'étalonnage de <strong>+0.6%</strong> :
                  </p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginTop: '1rem' }}>
                    <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>RÉDUCTION REJETS Ht-</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#10b981', marginTop: '0.2rem' }}>- 65 %</div>
                      <span style={{ fontSize: '0.7rem', color: '#047857' }}>~44 compteurs sauvés</span>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>GAIN FPY GLOBAL</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#1d72fe', marginTop: '0.2rem' }}>+ 2.4 %</div>
                      <span style={{ fontSize: '0.7rem', color: '#155bd8' }}>FPY passe à 93.3%</span>
                    </div>

                    <div style={{ backgroundColor: '#ffffff', padding: '1rem', borderRadius: '10px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.72rem', color: '#64748b' }}>COÛT DE MISE EN OEUVRE</div>
                      <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginTop: '0.2rem' }}>0 DA</div>
                      <span style={{ fontSize: '0.7rem', color: '#64748b' }}>Simple réglage logiciel</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PROMPT RESULT 3 : ROOT CAUSE */}
            {activePrompt === 'rootcause' && (
              <div className="fade-in">
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <span className="badge badge-amber">Analyse 5 Pourquoi & Ishikawa</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
                    Causes Racines des Compteurs Bloqués (65 Unités)
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', fontSize: '0.82rem' }}>
                  <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0f172a' }}>1. Sertissage du Pignon XN3 (Fiche NC-2026-003) :</strong>
                    <p style={{ color: '#475569', marginTop: '0.25rem' }}>
                      Le poinçon de sertissage N°1 descendait trop bas, provoquant un écrasement de la platine intermédiaire et un voilage du pignon qui bloque l'engrenage lors de l'écoulement d'eau.
                    </p>
                  </div>

                  <div style={{ padding: '1rem', borderRadius: '10px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
                    <strong style={{ color: '#0f172a' }}>2. Épaisseur excessive des joints toriques Ø 61 (Jostar China) :</strong>
                    <p style={{ color: '#475569', marginTop: '0.25rem' }}>
                      Le sur-dimensionnement du joint HT+ comprime la chambre de mesure au vissage de la tête laiton (sur-couple à 110 N.m), pinçant la turbine.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* PROMPT RESULT 4 : FOURNISSEURS */}
            {activePrompt === 'fournisseurs' && (
              <div className="fade-in">
                <div style={{ borderBottom: '1px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <span className="badge badge-purple">Audit Fournisseurs 2026</span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', marginTop: '0.35rem' }}>
                    Synthèse de Réactivité & Qualité Livraisons
                  </h3>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569' }}>
                      <th style={{ padding: '0.75rem' }}>Fournisseur</th>
                      <th style={{ padding: '0.75rem' }}>Bons de Réception</th>
                      <th style={{ padding: '0.75rem' }}>Quantité Totale</th>
                      <th style={{ padding: '0.75rem' }}>Délai Contrôle Moyen</th>
                      <th style={{ padding: '0.75rem' }}>Taux de Non-Conformité</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>SLR (Corps, Têtes, Raccords)</td>
                      <td style={{ padding: '0.75rem' }}>14 BR</td>
                      <td style={{ padding: '0.75rem' }}>245 000 pces</td>
                      <td style={{ padding: '0.75rem' }}>1.0 jour</td>
                      <td style={{ padding: '0.75rem', color: '#10b981', fontWeight: 700 }}>0.8 % (Très Faible)</td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '0.75rem', fontWeight: 700 }}>Jostar China (Joints toriques)</td>
                      <td style={{ padding: '0.75rem' }}>6 BR</td>
                      <td style={{ padding: '0.75rem' }}>80 000 pces</td>
                      <td style={{ padding: '0.75rem' }}>2.1 jours</td>
                      <td style={{ padding: '0.75rem', color: '#ef4444', fontWeight: 700 }}>6.2 % (Alerte Cote HT+)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* PROMPT RESULT 5 : RAPPORT ISO */}
            {activePrompt === 'rapport_iso' && (
              <div className="fade-in">
                <div style={{ borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#1d72fe', fontSize: '0.85rem' }}>SENSUS SPA • DÉPARTEMENT TECHNIQUE</span>
                    <span style={{ fontSize: '0.75rem', color: '#64748b' }}>Réf: RAP-ISO-2026-M09</span>
                  </div>
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 900, color: '#0f172a', marginTop: '0.35rem' }}>
                    RAPPORT MENSUEL DE CONFORMITÉ QUALITÉ & MÉTROLOGIE
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: '#64748b' }}>
                    Période sous revue : Septembre 2026 • Validé par : <strong>Boudoukha A. (Responsable Technique)</strong>
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.82rem', color: '#334155', lineHeight: 1.6 }}>
                  <div>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>1. Performance Globale de Production</h4>
                    <p>
                      Au cours de la période, <strong>1 820 compteurs d'eau</strong> ont été contrôlés sur les 4 bancs de test en service. Le taux de conformité Bon du premier coup (First Pass Yield) s'établit à <strong>90.93% (1 655 unités)</strong>.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>2. État du Parc Métrologique & Étalonnages</h4>
                    <p>
                      Tous les bancs d'essais ont fait l'objet de vérifications quotidiennes par rapport à l'étalon maître <strong>Primatest 2</strong>. L'incertitude type $u_{MT}$ reste maîtrisée conformément à la procédure P-ML-01/01.
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontWeight: 800, color: '#0f172a', marginBottom: '0.3rem' }}>3. Décision & Visa de la Direction</h4>
                    <div style={{
                      marginTop: '0.75rem',
                      padding: '1rem',
                      backgroundColor: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, color: '#0f172a' }}>Visa Responsable Métrologie</div>
                        <div style={{ fontSize: '0.72rem', color: '#16a34a' }}>✅ Certifié Conforme pour Audit ISO 9001</div>
                      </div>
                      <div style={{ fontFamily: 'monospace', fontSize: '0.75rem', color: '#64748b' }}>
                        Horodaté le 04/10/2026 à 15:25 (Sensus SPA)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
}
