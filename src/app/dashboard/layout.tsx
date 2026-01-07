"use client";

import Link from "next/link";
import { useState } from "react";
import { UserButton, useUser } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Calculator, 
  FileText, 
  Settings, 
  Users,
  Menu, 
  X,
  ShieldCheck 
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // 1. OBTENER DATOS DEL USUARIO
  const { user, isLoaded } = useUser();
  const role = user?.publicMetadata?.role as string | undefined;
  // Convertimos a minúsculas y limpiamos espacios por seguridad
  const normalizedRole = role?.trim().toLowerCase();
  const isAdmin = normalizedRole === 'admin';

  if (!isLoaded) return null; 

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. SIDEBAR ESCRITORIO */}
      <aside className="hidden md:flex w-64 bg-[#1A1F2C] text-white flex-col flex-shrink-0 transition-all duration-300">
        <SidebarContent isAdmin={isAdmin} />
      </aside>

      {/* 2. SIDEBAR MÓVIL (Overlay) */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 w-64 bg-[#1A1F2C] text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>
        <SidebarContent isAdmin={isAdmin} />
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen w-full">
        {/* Header Superior */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 flex-shrink-0 w-full">
           
           <div className="flex items-center gap-3 overflow-hidden">
             <button 
               className="md:hidden text-slate-700 p-1 flex-shrink-0"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={24} />
             </button>
             <h1 className="font-bold text-slate-700 truncate text-sm md:text-base">
                {isAdmin ? 'Panel de Gestión' : 'Portal de Cliente'}
             </h1>
           </div>

           <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-sm font-medium hidden sm:block truncate max-w-[150px]">
                {user?.fullName || 'Usuario'}
              </span>
              <UserButton afterSignOutUrl="/" /> 
           </div>
        </header>

        {/* Zona de contenido cambiante */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 w-full relative">
          {children}
        </div>
      </main>
    </div>
  );
}

// --- LOGICA DEL MENÚ LATERAL ---
function SidebarContent({ isAdmin }: { isAdmin: boolean }) {
  return (
    <>
      <div className="p-6 border-b border-slate-700 flex flex-col items-start gap-2">
          {/* LOGO AQUÍ - Aplicamos filtro CSS para que se vea blanco */}
          <img 
            src="/LOGO-NHS.png" 
            alt="Nexus Health Strategies" 
            // brightness-0 invert convierte la imagen oscura en una silueta blanca
            className="h-12 w-auto object-contain brightness-0 invert filter"
          />
          
          <span className="text-[10px] text-slate-400 block tracking-[0.2em] uppercase mt-1">
            {isAdmin ? 'Internal Tools' : 'Client Access'}
          </span>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        
        {/* === MENÚ PARA ADMINISTRADORES === */}
        {isAdmin ? (
            <>
                <div className="pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
                    Negocio
                </div>
                <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Panel Principal" />
                <NavItem href="/dashboard/clientes" icon={<Users size={20} />} label="Clientes" />
                <NavItem href="/dashboard/calculadora-interna" icon={<Calculator size={20} />} label="Calculadora Costos" />
                
                <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                    Legal
                </div>
                <NavItem href="/dashboard/docs" icon={<FileText size={20} />} label="Contratos y Expedientes" />
            </>
        ) : (
        /* === MENÚ PARA CLIENTES === */
            <>
               <div className="pb-2 px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">
                    Su Expediente
                </div>
               <NavItem href="/dashboard/docs" icon={<ShieldCheck size={20} />} label="Registro Regulatorio" />
            </>
        )}

      </nav>

      {/* FOOTER DEL MENÚ */}
      <div className="p-4 border-t border-slate-700 space-y-2">
        <NavItem href="/user-profile" icon={<Settings size={20} />} label="Configuración" />
      </div>
    </>
  );
}

// Componente auxiliar de botón
function NavItem({ href, icon, label, external = false }: any) {
  return (
    <Link 
      href={href} 
      target={external ? "_blank" : undefined}
      className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all text-sm group"
    >
      <span className="group-hover:text-[#F7941D] transition-colors duration-200">
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
}