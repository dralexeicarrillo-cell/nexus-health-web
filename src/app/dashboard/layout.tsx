import Link from "next/link";
import { UserButton } from "@clerk/nextjs"; // <--- Importar esto
import { 
  LayoutDashboard, 
  Calculator, 
  FileText, 
  Settings, 
  LogOut, 
  Users 
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* SIDEBAR */}
      <aside className="w-64 bg-[#1A1F2C] text-white flex flex-col hidden md:flex">
        <div className="p-6 border-b border-slate-700">
           <span className="font-serif text-2xl font-bold">NHS+</span>
           <span className="text-xs text-slate-400 block tracking-widest mt-1">INTERNAL TOOLS</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Panel Principal" />
          <NavItem href="https://calc.nhealths.com" icon={<Calculator size={20} />} label="Calculadora LatAm" external />
          <NavItem href="/dashboard/clientes" icon={<Users size={20} />} label="Clientes" />
          <NavItem href="/dashboard/docs" icon={<FileText size={20} />} label="Documentación" />
          <NavItem href="/dashboard/calculadora-interna" icon={<Calculator size={20} />} label="Calculadora Costos" />
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          {/* Botón de configuración */}
          <NavItem href="/user-profile" icon={<Settings size={20} />} label="Configuración" />
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
           <h1 className="font-bold text-slate-700">Área de Gestión</h1>
           <div className="flex items-center gap-3">
              <span className="text-sm font-medium">Cuenta</span>
              {/* Este botón maneja tu perfil, cerrar sesión, etc. */}
              <UserButton afterSignOutUrl="/" /> 
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label, external = false }: any) {
  return (
    <Link 
      href={href} 
      target={external ? "_blank" : undefined}
      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm"
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}