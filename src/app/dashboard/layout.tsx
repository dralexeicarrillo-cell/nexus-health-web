import Link from "next/link";
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
      
      {/* SIDEBAR - Navegación Lateral */}
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
        </nav>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <NavItem href="/dashboard/settings" icon={<Settings size={20} />} label="Configuración" />
          <Link href="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm">
            <LogOut size={20} />
            <span>Salir</span>
          </Link>
        </div>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 overflow-y-auto">
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8">
           <h1 className="font-bold text-slate-700">Área de Gestión</h1>
           <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#F7941D] rounded-full flex items-center justify-center text-white font-bold text-xs">
                GM
              </div>
              <span className="text-sm font-medium">Gerencia</span>
           </div>
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Pequeño componente para los botones del menú
function NavItem({ href, icon, label, external = false }: { href: string, icon: React.ReactNode, label: string, external?: boolean }) {
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