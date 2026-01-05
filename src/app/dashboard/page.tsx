import Link from "next/link";
import { Calculator, FileText, ArrowUpRight, Database } from "lucide-react";

// Mantenemos esto para que la página siempre esté fresca
export const dynamic = 'force-dynamic';

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        {/* CAMBIO AQUÍ: Texto simple y directo, sin riesgo de error */}
        <h2 className="text-2xl font-bold text-[#1A1F2C]">Bienvenido.</h2>
        <p className="text-slate-500">Seleccione una herramienta para comenzar.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* CARD 1: Calculadora Interna */}
        <ToolCard 
          href="/dashboard/calculadora-interna"
          icon={<Calculator size={32} />}
          title="Calculadora Costos"
          desc="Herramienta interna para cotización de servicios y márgenes."
          color="bg-blue-50 text-[#262262]"
        />

        {/* CARD 2: Calculadora Pública */}
        <ToolCard 
          href="https://calc.nhealths.com"
          icon={<ArrowUpRight size={32} />}
          title="Calculadora Leads"
          desc="Enlace directo a la calculadora pública de captación."
          color="bg-purple-50 text-purple-700"
          external
        />

        {/* CARD 3: Registro */}
        <ToolCard 
          href="#"
          icon={<Database size={32} />}
          title="Registro Regulatorio"
          desc="Base de datos de normativas FDA y Ministerios de Salud locales."
          color="bg-orange-50 text-[#F7941D]"
        />

        {/* CARD 4: Documentos */}
        <ToolCard 
          href="#"
          icon={<FileText size={32} />}
          title="Gestor Documental"
          desc="Plantillas de contratos y propuestas comerciales."
          color="bg-slate-100 text-slate-600"
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
      className="bg-white p-6 rounded-xl border border-slate-200 hover:border-[#262262] hover:shadow-lg transition-all group relative overflow-hidden flex flex-col h-full"
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