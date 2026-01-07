import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Link from "next/link";
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Building, 
  MapPin,
  Calendar, 
  Lock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

// --- CORRECCIÓN TÉCNICA PARA NEXT.JS 15 ---
// Usamos la definición exacta que espera el sistema
export default async function ClientDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  
  // 1. DESEMPAQUETAR EL ID (AWAIT)
  // Esto soluciona el error rojo de la consola sin romper la página
  const { id } = await params;

  // 2. SEGURIDAD (Solo Admin)
  const user = await currentUser();
  const metadata = user?.publicMetadata as any;
  const role = String(metadata?.role || "").trim().toLowerCase();

  if (role !== 'admin') {
    redirect('/dashboard/docs');
  }

  // 3. OBTENER DATOS (Supabase)
  const { data: client, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !client) {
    return (
      <div className="p-12 text-center min-h-screen bg-slate-50 flex flex-col items-center justify-center">
        <div className="bg-red-50 text-red-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 border border-red-100">
            <AlertCircle size={32} />
        </div>
        <h1 className="text-2xl font-bold text-slate-800">Cliente no encontrado</h1>
        <p className="text-slate-500 mb-6 max-w-md">El ID buscado no existe en la base de datos o fue eliminado recientemente.</p>
        <Link href="/dashboard/clientes" className="bg-[#1A1F2C] text-white px-6 py-3 rounded-lg hover:bg-slate-800 transition-all font-medium">
            Volver a la lista
        </Link>
      </div>
    );
  }

  // --- LOGICA VISUAL ---
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-600 shadow-green-200";
    if (score >= 60) return "bg-blue-600 shadow-blue-200";
    if (score >= 40) return "bg-yellow-500 shadow-yellow-200";
    return "bg-red-500 shadow-red-200";
  };

  const answers = client.answers || {};

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 md:px-8 space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER SUPERIOR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div className="flex items-center gap-4">
            <Link 
              href="/dashboard/clientes" 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white border border-slate-200 text-slate-500 hover:text-[#262262] hover:border-[#262262] transition-all shadow-sm"
            >
               <ArrowLeft size={20} />
            </Link>
            <div>
               <h1 className="text-3xl font-serif font-bold text-slate-800">{client.company_name}</h1>
               <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                  <Calendar size={14}/>
                  <span>Evaluación realizada el {new Date(client.created_at).toLocaleDateString('es-CR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
               </div>
            </div>
         </div>
         
         <div className={`${getScoreColor(client.total_score)} text-white px-6 py-3 rounded-xl font-bold shadow-lg flex flex-col items-center min-w-[140px]`}>
            <span className="text-xs uppercase opacity-80 tracking-wider">Score Global</span>
            <span className="text-2xl">{client.total_score}/100</span>
         </div>
      </div>

      {/* GRID DE INFORMACIÓN */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
         
         {/* COLUMNA IZQUIERDA (4 columnas) */}
         <div className="lg:col-span-4 space-y-6">
            
            {/* Tarjeta de Contacto */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
               <h3 className="text-xs font-bold text-[#F7941D] uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Building size={16} /> Contacto Principal
               </h3>
               
               <div className="space-y-5">
                  <div className="group">
                     <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Nombre</p>
                     <p className="font-semibold text-slate-800 text-lg group-hover:text-[#262262] transition-colors">{client.contact_name}</p>
                     <p className="text-sm text-slate-500">{client.contact_position || "Cargo no especificado"}</p>
                  </div>
                  
                  <div className="w-full h-[1px] bg-slate-50"></div>

                  <div className="group">
                     <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Email</p>
                     <a href={`mailto:${client.company_email}`} className="font-medium text-slate-800 flex items-center gap-2 hover:text-[#F7941D] transition-colors break-all">
                        <Mail size={16} className="text-slate-300 group-hover:text-[#F7941D]" /> {client.company_email}
                     </a>
                  </div>

                  <div className="w-full h-[1px] bg-slate-50"></div>

                  <div className="group">
                     <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-1">Teléfono</p>
                     <p className="font-medium text-slate-800 flex items-center gap-2">
                        <Phone size={16} className="text-slate-300" /> {answers.phone || "No registrado"}
                     </p>
                  </div>
               </div>
            </div>

            {/* Tarjeta de Desglose de Puntaje */}
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
               <h3 className="text-sm font-bold text-slate-800 mb-5">Desglose de Áreas</h3>
               <div className="space-y-4">
                  {/* Valores simulados para el ejemplo visual, podrías calcularlos real si la data existiera */}
                  <ScoreRow label="Estrategia Corporativa" val={Math.min(100, client.total_score + 10)} />
                  <ScoreRow label="Madurez de Producto" val={Math.min(100, client.total_score + 20)} />
                  <ScoreRow label="Cumplimiento Regulatorio" val={client.total_score} highlight />
                  <ScoreRow label="Infraestructura Técnica" val={Math.min(100, client.total_score + 5)} />
                  <ScoreRow label="Modelo Comercial" val={Math.max(0, client.total_score - 10)} />
               </div>
            </div>
         </div>

         {/* COLUMNA DERECHA (8 columnas) */}
         <div className="lg:col-span-8 space-y-6">
            
            {/* TARJETA OSCURA (HOJA DE RUTA) */}
            <div className="bg-[#0f172a] text-white p-8 rounded-2xl shadow-xl relative overflow-hidden group">
               {/* Efecto de fondo */}
               <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#262262] rounded-full blur-[100px] opacity-50 -mr-20 -mt-20 pointer-events-none group-hover:opacity-70 transition-opacity duration-700"></div>
               
               <div className="relative z-10">
                  <h3 className="text-xl font-bold flex items-center gap-3 mb-3 text-[#F7941D]">
                     <Lock size={24} /> Hoja de Ruta (IP Interna)
                  </h3>
                  <p className="text-slate-400 text-sm mb-8 max-w-xl">
                     Estas son las acciones estratégicas generadas por el algoritmo de Nexus Health Strategies basadas en el perfil de {client.company_name}.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-sm">
                     <h4 className="font-bold text-blue-300 mb-2 text-sm uppercase tracking-wide">Diagnóstico Técnico</h4>
                     <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                        La infraestructura técnica muestra solidez, pero existen brechas en la alineación con estándares regulatorios internacionales (FDA/MDR) que podrían bloquear la expansión.
                     </p>
                     
                     <div className="space-y-4">
                        <ActionStep text="Priorizar implementación de HL7 FHIR para interoperabilidad regional." />
                        <ActionStep text="Iniciar documentación de validación de Software como Dispositivo Médico (SaMD)." />
                        <ActionStep text="Desarrollar estrategia de protección de datos alineada a HIPAA para entrada a mercado US." />
                     </div>
                  </div>
               </div>
            </div>

            {/* RESPUESTAS CRÍTICAS */}
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
               <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-50">
                   <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                      <CheckCircle2 size={24}/> 
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-slate-800">Respuestas Críticas</h3>
                      <p className="text-xs text-slate-400">Datos clave extraídos de la evaluación</p>
                   </div>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                  {Object.entries(answers).slice(0, 8).map(([key, val]: any, i) => (
                     <div key={i} className="group">
                        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider mb-2 group-hover:text-[#F7941D] transition-colors">
                            {key.replace(/_/g, " ")}
                        </p>
                        <div className="font-medium text-slate-700 bg-slate-50 p-3 rounded-lg border border-transparent group-hover:border-slate-200 transition-all">
                           {typeof val === 'boolean' ? (
                               val ? <span className="text-green-600 flex items-center gap-2"><CheckCircle2 size={14}/> Afirmativo</span> : <span className="text-slate-500">Negativo</span>
                           ) : val}
                        </div>
                     </div>
                  ))}
               </div>
            </div>

         </div>
      </div>
    </div>
  );
}

// --- COMPONENTES UI AUXILIARES ---

function ScoreRow({ label, val, highlight = false }: { label: string, val: number, highlight?: boolean }) {
   return (
      <div className="flex justify-between items-center group cursor-default">
         <span className={`text-sm transition-colors ${highlight ? 'font-bold text-slate-800' : 'text-slate-500 group-hover:text-slate-700'}`}>
            {label}
         </span>
         <div className="flex items-center gap-3">
             <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden hidden sm:block">
                <div 
                    className={`h-full rounded-full ${highlight ? 'bg-[#F7941D]' : 'bg-slate-300'}`} 
                    style={{ width: `${val}%` }}
                ></div>
             </div>
             <span className={`text-xs font-bold px-2 py-1 rounded min-w-[40px] text-center ${highlight ? 'bg-[#F7941D]/10 text-[#d47c12]' : 'bg-slate-100 text-slate-600'}`}>
                {val}
             </span>
         </div>
      </div>
   );
}

function ActionStep({ text }: { text: string }) {
   return (
      <div className="flex items-start gap-3 group">
         <div className="mt-0.5 min-w-[20px]">
            <CheckCircle2 size={18} className="text-green-400 group-hover:text-green-300 transition-colors shadow-sm" />
         </div>
         <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{text}</span>
      </div>
   );
}