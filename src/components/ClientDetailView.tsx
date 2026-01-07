'use client'

import Link from 'next/link'
import { 
  ArrowLeft, 
  Mail, 
  Phone, 
  Globe, 
  User, 
  CheckCircle2,
  FileText,
  Lock
} from 'lucide-react'

interface Recommendation {
  title: string;
  description: string;
  actionItems?: string[];
}

interface Scores {
  company: number;
  product: number;
  regulatory: number;
  technical: number;
  commercial: number;
}

interface AssessmentData {
  company_name: string;
  contact_name: string;
  company_email: string; // <--- CORREGIDO: Antes decía contact_email
  contact_phone: string;
  contact_position: string;
  company_website?: string;
  total_score: number;
  scores: Scores;
  responses: any;
  recommendations: Recommendation[];
  created_at: string;
}

export default function ClientDetailView({ assessment }: { assessment: AssessmentData }) {
  const { 
    company_name, 
    contact_name, 
    company_email, // <--- CORREGIDO: Usamos el nombre real de la base de datos
    contact_phone, 
    contact_position,
    company_website,
    total_score,
    scores,
    responses,        
    recommendations,  
    created_at
  } = assessment

  const date = new Date(created_at).toLocaleDateString('es-ES', {
    day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* HEADER */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/clientes" className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-500">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">{company_name}</h1>
          <p className="text-slate-500 text-sm">Evaluación realizada el {date}</p>
        </div>
        <div className="ml-auto flex gap-3">
          <span className={`px-4 py-2 rounded-lg font-bold text-white ${
            total_score >= 80 ? 'bg-emerald-500' :
            total_score >= 60 ? 'bg-blue-500' :
            total_score >= 40 ? 'bg-amber-500' : 'bg-red-500'
          }`}>
            Score: {total_score}/100
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <User size={18} className="text-blue-600" /> Contacto Principal
            </h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Nombre</label>
                <p className="font-medium text-slate-700">{contact_name}</p>
                <p className="text-sm text-slate-500">{contact_position}</p>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Email</label>
                <div className="flex items-center gap-2 text-slate-700">
                  {/* Aquí usamos company_email */}
                  <Mail size={14} /> <a href={`mailto:${company_email}`} className="hover:text-blue-600 hover:underline">{company_email}</a>
                </div>
              </div>
              <div>
                <label className="text-xs text-slate-400 font-bold uppercase">Teléfono</label>
                <div className="flex items-center gap-2 text-slate-700">
                  <Phone size={14} /> <a href={`tel:${contact_phone}`} className="hover:text-blue-600 hover:underline">{contact_phone}</a>
                </div>
              </div>
              {company_website && (
                <div>
                  <label className="text-xs text-slate-400 font-bold uppercase">Web</label>
                  <div className="flex items-center gap-2 text-slate-700">
                    <Globe size={14} /> <a href={company_website} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:underline">{company_website}</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4">Desglose de Puntaje</h3>
            <div className="space-y-3">
              <ScoreRow label="Corporativo" val={scores.company} />
              <ScoreRow label="Producto" val={scores.product} />
              <ScoreRow label="Regulatorio" val={scores.regulatory} />
              <ScoreRow label="Técnico" val={scores.technical} />
              <ScoreRow label="Comercial" val={scores.commercial} />
            </div>
          </div>
        </div>

        {/* COLUMNA CENTRAL */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* HOJA DE RUTA (IP INTERNA) */}
          <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg border-l-4 border-orange-500">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="text-orange-500" />
              <h3 className="text-xl font-bold">Hoja de Ruta (IP Interna)</h3>
            </div>
            <p className="text-slate-400 text-sm mb-6">
              Estas son las acciones específicas generadas por el algoritmo.
            </p>
            
            <div className="space-y-4">
              {recommendations.map((rec, i) => (
                <div key={i} className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <h4 className="font-bold text-orange-400 mb-1">{rec.title}</h4>
                  <p className="text-sm text-slate-300 mb-3">{rec.description}</p>
                  
                  <div className="pl-4 border-l-2 border-slate-700">
                    <p className="text-xs font-bold text-slate-500 uppercase mb-2">Pasos de Acción:</p>
                    <ul className="space-y-2">
                      {rec.actionItems?.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-slate-300">
                          <CheckCircle2 size={14} className="mt-1 text-green-500 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RESPUESTAS CRÍTICAS */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <FileText size={18} className="text-blue-600" /> Respuestas Críticas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-sm">
              <InfoItem label="Tamaño Empresa" value={responses.companySize} />
              <InfoItem label="Sede Principal" value={responses.headquarters} />
              <InfoItem label="Experiencia LATAM" value={responses.latamExp} />
              <div className="col-span-full h-px bg-slate-100 my-2"></div>
              <InfoItem label="Tipos de Producto" value={responses.productTypes?.join(', ')} />
              <InfoItem label="Datos de Salud" value={responses.healthData} />
              <InfoItem label="Clase Dispositivo" value={responses.deviceClass || 'N/A'} />
              <div className="col-span-full h-px bg-slate-100 my-2"></div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <InfoItem label="Certificaciones" value={responses.certifications?.join(', ') || 'Ninguna'} />
              </div>
              <div className="bg-red-50 p-3 rounded-lg border border-red-100">
                <InfoItem label="Cert. Libre Venta (CLV)" value={responses.clv} highlight={responses.clv === 'no'} />
              </div>
              <div className="col-span-full h-px bg-slate-100 my-2"></div>
              <InfoItem label="Presupuesto" value={responses.budget} />
              <InfoItem label="Entidad Legal Local" value={responses.entity || responses.legal_entity} />
              <InfoItem label="Mercados Interés" value={responses.selectedMarkets?.join(', ')} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ScoreRow({ label, val }: { label: string, val: number }) {
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-600">{label}</span>
      <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded">{val}/100</span>
    </div>
  )
}

function InfoItem({ label, value, highlight }: { label: string, value: any, highlight?: boolean }) {
  const formatValue = (v: any) => {
    if (!v) return 'No especificado'
    if (v === 'na') return 'No Aplica'
    if (v === 'yes') return 'Sí'
    if (v === 'no') return 'No'
    return v.toString().charAt(0).toUpperCase() + v.toString().slice(1)
  }

  return (
    <div>
      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{label}</label>
      <p className={`font-medium ${highlight ? 'text-red-600 font-bold' : 'text-slate-700'}`}>
        {formatValue(value)}
      </p>
    </div>
  )
}