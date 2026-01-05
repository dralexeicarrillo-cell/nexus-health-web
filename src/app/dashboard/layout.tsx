"use client";

import Link from "next/link";
import { useState } from "react"; // Estado para el menú móvil
import { UserButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Calculator, 
  FileText, 
  Settings, 
  LogOut, 
  Users,
  Menu, // Icono de hamburguesa
  X     // Icono de cerrar
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* 1. SIDEBAR DE ESCRITORIO (Oculto en celular) */}
      <aside className="hidden md:flex w-64 bg-[#1A1F2C] text-white flex-col">
        <SidebarContent />
      </aside>

      {/* 2. MENÚ MÓVIL (Overlay) */}
      {/* Fondo oscuro al abrir */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
      
      {/* El menú lateral deslizante */}
      <div className={`fixed inset-y-0 left-0 w-64 bg-[#1A1F2C] text-white z-50 transform transition-transform duration-300 ease-in-out md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex justify-end p-4">
          <button onClick={() => setIsMobileMenuOpen(false)} className="text-white">
            <X size={24} />
          </button>
        </div>
        <SidebarContent />
      </div>

      {/* 3. CONTENIDO PRINCIPAL */}
      <main className="flex-1 flex flex-col overflow-hidden h-screen">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 flex-shrink-0">
           
           <div className="flex items-center gap-3">
             {/* Botón Hamburguesa (Solo visible en celular) */}
             <button 
               className="md:hidden text-slate-700 p-1"
               onClick={() => setIsMobileMenuOpen(true)}
             >
               <Menu size={24} />
             </button>
             <h1 className="font-bold text-slate-700 truncate">Área de Gestión</h1>
           </div>

           <div className="flex items-center gap-3">
              <span className="text-sm font-medium hidden sm:block">Cuenta</span>
              {/* AQUÍ ESTÁ EL CAMBIO DEL LOGOUT: afterSignOutUrl="/" */}
              <UserButton afterSignOutUrl="/" /> 
           </div>
        </header>

        {/* Contenido Scrollable */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

// Extraje el contenido del menú para no repetirlo
function SidebarContent() {
  return (
    <>
      <div className="p-6 border-b border-slate-700">
          <span className="font-serif text-2xl font-bold">NHS+</span>
          <span className="text-xs text-slate-400 block tracking-widest mt-1">INTERNAL TOOLS</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <NavItem href="/dashboard" icon={<LayoutDashboard size={20} />} label="Panel Principal" />
        <NavItem href="/dashboard/calculadora-interna" icon={<Calculator size={20} />} label="Calculadora Costos" />
        <NavItem href="https://calc.nhealths.com" icon={<Calculator size={20} />} label="Calculadora Leads" external />
        <NavItem href="/dashboard/clientes" icon={<Users size={20} />} label="Clientes" />
        <NavItem href="/dashboard/docs" icon={<FileText size={20} />} label="Documentación" />
      </nav>

      <div className="p-4 border-t border-slate-700 space-y-2">
        <NavItem href="/user-profile" icon={<Settings size={20} />} label="Configuración" />
      </div>
    </>
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