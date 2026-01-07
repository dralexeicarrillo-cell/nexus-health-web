import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import DownloadReportButton from "@/components/DownloadReportButton";
import ClientDossier from "@/components/ClientDossier"; // <--- NUEVO
import ArchiveClientButton from "@/components/ArchiveClientButton"; // <--- NUEVO
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  Globe, 
  Lock, 
  CheckCircle2, 
  TrendingUp, 
  BrainCircuit, 
  FileText,
  ListTodo,
  Clock,
  Circle
} from "lucide-react";

// --- INTERFAZ PARA NEXT.JS 15 ---
export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  const { id } = await params;

  // 1. SEGURIDAD
  const user = await currentUser();
  const metadata = user?.publicMetadata as any;
  const role = String(metadata?.role || "").trim().toLowerCase();

  if (role !== 'admin') {
    redirect('/dashboard/docs');
  }

  // 2. OBTENER DATOS
  const { data: client, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !client) {
    return (
      <div className="p-12 text-center min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-800">Cliente no encontrado</h1>
        <Link href="/dashboard/clientes" className="mt-4 text-blue-600 hover:underline">Volver a la lista</Link>
      </div>
    );
  }

  const answers = client.answers || {};

  // --- 3. MOTOR DE INTELIGENCIA ---
  const getStrategicAnalysis = (score: number) => {
    if (score < 40) return {
        phase: "Fase 1: Preparación Técnica",
        color: "text-red-600",
        description: "La empresa requiere estructuración técnica base antes de iniciar trámites legales.",
        marketInsight: "El 60% de los fallos ocurren por mala clasificación de riesgo inicial.",
        actions: ["Definir Clasificación de Riesgo", "Auditoría técnica", "Evaluación ISO 13485"]
    };
    if (score < 60) return {
        phase: "Fase 2: Establecimiento Legal",
        color: "text-yellow-600",
        description: "Producto viable. Se requiere constitución local o 'Hosting' regulatorio.",
        marketInsight: "Obligatorio contar con Titular de Registro local en mercados principales.",
        actions: ["Designar Representante Legal", "Apostillado de documentos", "Tecnovigilancia"]
    };
    if (score < 80) return {
        phase: "Fase 3: Registro Sanitario",
        color: "text-blue-600",
        description: "Listo para someter Dossiers a la autoridad sanitaria.",
        marketInsight: "Tiempo estimado COFEPRIS: 6-8 meses. INVIMA: 4-6 meses.",
        actions: ["Armado de Dossier Técnico", "Traducción certificada", "Sometimiento digital"]
    };
    return {
        phase: "Fase 4: Expansión Comercial",
        color: "text-green-600",
        description: "Foco en comercialización, licitaciones y mantenimiento.",
        marketInsight: "Oportunidad de acceso multi-país vía sistema RTCA (Centroamérica).",
        actions: ["Homologación RTCA", "Estrategia B2G", "Certificación BPA"]
    };
  };

  const analysis = getStrategicAnalysis(client.total_score);

  // --- 4. CHECKLIST MAESTRO ---
  const MASTER_CHECKLIST = [
    {
        title: "Fase 1: Preparación Previa",
        minScore: 0,
        items: ["Análisis clasificación SaMD", "Certificado Libre Venta", "ISO 13485"]
    },
    {
        title: "Fase 2: Establecimiento Legal",
        minScore: 40,
        items: ["Constitución / Hosting", "Identificación Fiscal", "Responsable Técnico"]
    },
    {
        title: "Fase 3: Registro Sanitario",
        minScore: 60,
        items: ["Dossier CTD", "Traducciones Juradas", "Sometimiento Autoridad"]
    },
    {
        title: "Fase 4: Comercialización",
        minScore: 80,
        items: ["Etiquetado NOM/RTCA", "Contratos Distribución", "Licitaciones Públicas"]
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-600 shadow-green-200";
    if (score >= 60) return "bg-blue-600 shadow-blue-200";
    if (score >= 40) return "bg-yellow-500 shadow-yellow-200";
    return "bg-red-500 shadow-red-200";
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/clientes" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#262262] transition-all shadow-sm"
            >
               <ArrowLeft size={20} />
            </Link>
            <div>
               <h1 className="text-3xl font-serif font-bold text-slate-800">{client.company_name}</h1>
               <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider ${
                      client.status === 'archived' ? 'bg-red-100 text-red-600' : 
                      client.status === 'active' ? 'bg-green-100 text-green-600' : 
                      'bg-slate-100 text-slate-600'
                  }`}>
                    {client.status === 'active' ? 'Cliente Activo' : client.status === 'archived' ? 'Archivado' : 'Lead'}
                  </span>
                  <span>• {new Date(client.created_at).toLocaleDateString()}</span>
               </div>
            </div>
         </div>
         
         <div className="flex items-center gap-4">
            {/* BOTÓN ARCHIVAR NUEVO */}
            <ArchiveClientButton clientId={client.id} currentStatus={client.status} />

            <div className={`${getScoreColor(client.total_score)} text-white px-6 py-3 rounded-xl font-bold shadow-lg flex flex-col items-center min-w-[140px]`}>
                <span className="text-xs uppercase opacity-80 tracking-wider">Score Global</span>
                <span className="text-3xl">{client.total_score}</span>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* COLUMNA IZQUIERDA */}
         <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="text-xs font-bold text-[#F7941D] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Building size={16} /> Ficha del Cliente
               </h3>
               <div className="space-y-4">
                  <p className="text-sm"><strong>Contacto:</strong> {client.contact_name}</p>
                  <div className="w-full h-[1px] bg-slate-50"></div>
                  <p className="text-sm"><strong>Email:</strong> {client.company_email}</p>
                  <div className="w-full h-[1px] bg-slate-50"></div>
                  <p className="text-sm"><strong>Teléfono:</strong> {answers.phone || "No registrado"}</p>
               </div>
            </div>

            {/* EXPEDIENTE DIGITAL (NUEVO) */}
            {(client.status === 'active' || client.status === 'archived') ? (
                <ClientDossier clientId={client.id} />
            ) : (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center">
                    <Lock className="mx-auto text-slate-400 mb-2" size={24} />
                    <h3 className="text-sm font-bold text-slate-600">Expediente Bloqueado</h3>
                    <p className="text-xs text-slate-500 mt-1">Activa este cliente para habilitar la carga de documentos.</p>
                </div>
            )}

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
               <h3 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Globe size={16} /> Market Insight
               </h3>
               <p className="text-sm text-slate-600 italic mb-4">"{analysis.marketInsight}"</p>
               <div className="flex items-center gap-2 text-xs text-slate-400">
                  <BrainCircuit size={14} /> <span>Fuente: Investigación Interna NHS+</span>
               </div>
            </div>
         </div>

         {/* COLUMNA DERECHA */}
         <div className="lg:col-span-8 space-y-8">
            
            {/* ESTRATEGIA */}
            <div className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#262262] rounded-full blur-[120px] opacity-40 -mr-20 -mt-20 pointer-events-none"></div>
               <div className="relative z-10">
                  <h3 className="text-xl font-bold flex items-center gap-3 mb-3 text-[#F7941D]">
                     <Lock size={24} /> Estrategia Generada: {analysis.phase.split(':')[0]}
                  </h3>
                  <p className="text-slate-400 text-sm mb-6 max-w-2xl">{analysis.description}</p>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                     <h4 className="font-bold text-blue-300 mb-4 text-sm uppercase tracking-wide flex items-center gap-2">
                        <TrendingUp size={16}/> Acciones Inmediatas
                     </h4>
                     <div className="space-y-3">
                        {analysis.actions.map((action, i) => (
                           <div key={i} className="flex items-start gap-3">
                              <CheckCircle2 size={18} className="text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-300">{action}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>

            {/* CHECKLIST */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2"><ListTodo className="text-[#F7941D]" /> Plan de Ejecución</h3>
                    <span className="text-xs text-slate-400">Basado en metodología regulatoria LatAm</span>
                </div>
                <div className="divide-y divide-slate-100">
                    {MASTER_CHECKLIST.map((phase, idx) => {
                        const isCompleted = client.total_score >= (phase.minScore + 20); 
                        const isCurrent = client.total_score >= phase.minScore && client.total_score < (phase.minScore + 20);
                        return (
                            <div key={idx} className={`p-6 ${isCurrent ? 'bg-blue-50/30' : ''}`}>
                                <div className="flex items-center gap-3 mb-4">
                                    {isCompleted ? <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><CheckCircle2 size={14} /></div> : 
                                     isCurrent ? <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse"><Clock size={14} /></div> : 
                                     <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-300 flex items-center justify-center"><Circle size={14} /></div>}
                                    <h4 className={`font-bold ${isCurrent ? 'text-blue-700' : isCompleted ? 'text-slate-700' : 'text-slate-400'}`}>{phase.title}</h4>
                                </div>
                                <div className="pl-9 space-y-3">
                                    {phase.items.map((item, i) => (
                                        <div key={i} className="flex items-start gap-3 text-sm">
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full ${isCompleted ? 'bg-green-400' : isCurrent ? 'bg-blue-400' : 'bg-slate-300'}`}></div>
                                            <span className={`${isCompleted ? 'text-slate-500 line-through' : isCurrent ? 'text-slate-700 font-medium' : 'text-slate-400'}`}>{item}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* BOTÓN PDF */}
            <div className="bg-gradient-to-r from-slate-50 to-white p-8 rounded-2xl border border-dashed border-slate-300 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <div className="bg-white p-3 rounded-full shadow-sm border border-slate-100 text-[#F7941D]"><FileText size={24} /></div>
                    <div>
                        <h3 className="text-slate-800 font-bold text-lg">Reporte Ejecutivo Oficial</h3>
                        <p className="text-slate-500 text-sm max-w-sm">Descarga el diagnóstico completo en formato PDF.</p>
                    </div>
                </div>
                <DownloadReportButton client={client} />
            </div>

         </div> 
      </div>
    </div>
  );
}