import Link from "next/link";
import { Calculator, FileText, ArrowUpRight, Database, ShieldAlert } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#1A1F2C]">Bienvenido, Doctor.</h2>
        <p className="text-slate-500">Seleccione una herramienta para comenzar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: Calculadora (Enlace Externo a tu subdominio) */}
        <ToolCard 
          href="https://calc.nhealths.com"
          icon={<Calculator size={32} />}
          title="Calculadora LatAm"
          desc="Estimación de costos de entrada al mercado y retorno de inversión."
          color="bg-blue-50 text-[#262262]"
          external
        />

        {/* CARD 2: Base de Conocimiento */}
        <ToolCard 
          href="#"
          icon={<Database size={32} />}
          title="Registro Regulatorio"
          desc="Base de datos de normativas FDA y Ministerios de Salud locales."
          color="bg-orange-50 text-[#F7941D]"
        />

        {/* CARD 3: Documentos */}
        <ToolCard 
          href="#"
          icon={<FileText size={32} />}
          title="Gestor Documental"
          desc="Plantillas de contratos y propuestas comerciales."
          color="bg-slate-100 text-slate-600"
        />

        {/* CARD 4: Auditoría */}
        <ToolCard 
          href="#"
          icon={<ShieldAlert size={32} />}
          title="Auditoría de Compliance"
          desc="Checklist de verificación para nuevos clientes."
          color="bg-green-50 text-green-700"
        />

      </div>
    </div>
  );
}

function ToolCard({ href, icon, title, desc, color, external }: any) {
  return (
    <Link 
      href={href}
      target={external ? "_blank" : undefined}
      className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#262262] hover:shadow-lg transition-all group relative overflow-hidden"
    >
      <div className={`w-14 h-14 rounded-lg flex items-center justify-center mb-4 ${color}`}>
        {icon}
      </div>
      <h3 className="font-bold text-lg text-slate-800 mb-2 group-hover:text-[#262262] flex items-center gap-2">
        {title}
        {external && <ArrowUpRight size={14} className="opacity-50" />}
      </h3>
      <p className="text-sm text-slate-500 leading-relaxed">
        {desc}
      </p>
    </Link>
  );
}