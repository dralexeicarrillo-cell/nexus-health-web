"use client";

import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";

// Estilos específicos para PDF (No funciona Tailwind aquí, es CSS de impresión)
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 11, color: '#333' },
  header: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, borderBottomWidth: 2, borderBottomColor: '#F7941D', paddingBottom: 10 },
  logoText: { fontSize: 20, fontWeight: 'bold', color: '#1A1F2C' },
  logoSub: { color: '#F7941D' },
  title: { fontSize: 24, marginBottom: 5, color: '#1A1F2C', fontFamily: 'Helvetica-Bold' },
  subtitle: { fontSize: 10, color: '#666', marginBottom: 20 },
  
  // Score Box
  scoreContainer: { flexDirection: 'row', backgroundColor: '#F8F9FA', padding: 15, borderRadius: 5, marginBottom: 25 },
  scoreLeft: { flex: 1 },
  scoreRight: { width: 80, alignItems: 'center', justifyContent: 'center', backgroundColor: '#1A1F2C', borderRadius: 5, padding: 5 },
  scoreNum: { fontSize: 28, color: 'white', fontWeight: 'bold' },
  scoreLabel: { fontSize: 8, color: '#F7941D', textTransform: 'uppercase' },

  // Sections
  sectionTitle: { fontSize: 14, color: '#F7941D', marginBottom: 10, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold' },
  text: { marginBottom: 8, lineHeight: 1.5 },
  highlightBox: { backgroundColor: '#F0F4FF', padding: 10, borderRadius: 4, marginBottom: 15, borderLeftWidth: 3, borderLeftColor: '#2563EB' },
  
  // Checklist Table
  table: { display: "flex", width: "auto", borderStyle: "solid", borderWidth: 1, borderColor: "#E5E7EB", borderRadius: 4, marginTop: 10 },
  tableRow: { margin: "auto", flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#E5E7EB", minHeight: 25, alignItems: 'center' },
  col1: { width: "10%", padding: 5 },
  col2: { width: "90%", padding: 5 },
  check: { fontSize: 10, color: 'green' },
  pending: { fontSize: 10, color: '#999' },
  
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, textAlign: 'center', fontSize: 9, color: '#999', borderTopWidth: 1, borderTopColor: '#EEE', paddingTop: 10 }
});

// Lógica de Negocio (Copiada del Dashboard para consistencia)
const getAnalysis = (score: number) => {
    if (score < 40) return { phase: "Fase 1: Preparación Técnica", color: "#EF4444" };
    if (score < 60) return { phase: "Fase 2: Establecimiento Legal", color: "#F59E0B" };
    if (score < 80) return { phase: "Fase 3: Registro Sanitario", color: "#2563EB" };
    return { phase: "Fase 4: Expansión Comercial", color: "#10B981" };
};

const MASTER_CHECKLIST = [
    { title: "Preparación Previa", minScore: 0, items: ["Clasificación de Riesgo", "Certificado Libre Venta", "ISO 13485 / BPM"] },
    { title: "Establecimiento Legal", minScore: 40, items: ["Constitución / Hosting", "Identificación Fiscal", "Responsable Técnico"] },
    { title: "Registro Sanitario", minScore: 60, items: ["Armado de Dossier", "Traducciones Certificadas", "Sometimiento Digital"] },
    { title: "Comercialización", minScore: 80, items: ["Etiquetado NOM/RTCA", "Contratos Distribución", "Licitaciones Públicas"] }
];

// COMPONENTE DOCUMENTO
export default function ClientReportPDF({ client }: { client: any }) {
  const analysis = getAnalysis(client.total_score);
  const date = new Date().toLocaleDateString();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* HEADER */}
        <View style={styles.header}>
            <Text style={styles.logoText}>NEXUS <Text style={styles.logoSub}>HEALTH</Text></Text>
            <Text style={{fontSize: 10, color: '#666'}}>Reporte Confidencial • {date}</Text>
        </View>

        {/* TITULO */}
        <Text style={styles.title}>{client.company_name}</Text>
        <Text style={styles.subtitle}>
            Contacto: {client.contact_name} ({client.company_email})
        </Text>

        {/* SCORE CARD */}
        <View style={styles.scoreContainer}>
            <View style={styles.scoreLeft}>
                <Text style={{fontSize: 10, color: '#666', textTransform: 'uppercase'}}>Diagnóstico Actual</Text>
                <Text style={{fontSize: 16, marginTop: 5, color: '#1A1F2C', fontFamily: 'Helvetica-Bold'}}>{analysis.phase}</Text>
                <Text style={{fontSize: 10, marginTop: 5, color: '#555'}}>
                    Basado en metodología regulatoria para LatAm.
                </Text>
            </View>
            <View style={styles.scoreRight}>
                <Text style={styles.scoreNum}>{client.total_score}</Text>
                <Text style={styles.scoreLabel}>Puntaje</Text>
            </View>
        </View>

        {/* ESTRATEGIA */}
        <Text style={styles.sectionTitle}>Análisis Estratégico</Text>
        <View style={styles.highlightBox}>
            <Text style={styles.text}>
                Según la evaluación realizada, la empresa se encuentra en una etapa crítica de definición. 
                Se recomienda priorizar la estructura legal local antes de iniciar trámites sanitarios para evitar prevenciones de la autoridad (COFEPRIS/INVIMA).
            </Text>
        </View>

        {/* CHECKLIST TABLE */}
        <Text style={styles.sectionTitle}>Hoja de Ruta Regulatoria</Text>
        <View style={styles.table}>
            {MASTER_CHECKLIST.map((phase, i) => {
                const isCompleted = client.total_score >= (phase.minScore + 20);
                const isCurrent = client.total_score >= phase.minScore && client.total_score < (phase.minScore + 20);
                
                return (
                    <View key={i}>
                        {/* Phase Header */}
                        <View style={[styles.tableRow, { backgroundColor: '#F3F4F6' }]}>
                            <View style={{padding: 5}}>
                                <Text style={{fontFamily: 'Helvetica-Bold', fontSize: 10, color: isCurrent ? '#2563EB' : '#333'}}>
                                    {phase.title} {isCurrent ? '(EN CURSO)' : ''} {isCompleted ? '(COMPLETADO)' : ''}
                                </Text>
                            </View>
                        </View>
                        {/* Items */}
                        {phase.items.map((item, j) => (
                            <View key={j} style={styles.tableRow}>
                                <View style={styles.col1}>
                                    <Text style={isCompleted ? styles.check : styles.pending}>
                                        {isCompleted ? '[ OK ]' : '[   ]'}
                                    </Text>
                                </View>
                                <View style={styles.col2}>
                                    <Text style={{fontSize: 10, color: '#444'}}>{item}</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )
            })}
        </View>

        {/* FOOTER */}
        <Text style={styles.footer}>
            Generado por Nexus Health Strategies Platform • IP Privada • No distribuir sin autorización.
        </Text>

      </Page>
    </Document>
  );
}