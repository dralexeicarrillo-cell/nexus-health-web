"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser, SignOutButton } from "@clerk/nextjs";
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  LogOut, 
  Shield,
  Settings,
  Calculator,
  ShieldCheck
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, isLoaded } = useUser();

  // Verificar si es admin
  const role = user?.publicMetadata?.role as string;
  const isAdmin = role === 'admin';

  if (!isLoaded) return <div className="w-64 h-screen bg-[#1A1F2C] animate-pulse"></div>;

  const isActive = (path: string) => pathname === path;

  // Componente interno para los botones del menú (para no repetir clases)
  const NavItem = ({ href, icon, label }: any) => (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-sm group ${
          isActive(href) 
          ? 'bg-[#F7941D] text-white shadow-md font-medium' 
          : 'text-slate-400 hover:bg-white/10 hover:text-white'
      }`}
    >
      <span className={isActive(href) ? 'text-white' : 'group-hover:text-[#F7941D] transition-colors'}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );

  return (
    <div className="w-64 h-screen bg-[#1A1F2C] text-white flex flex-col fixed left-0 top-0 z-20 shadow-xl border-r border-slate-800">
      
      {/* --- LOGO (Recuperado del diseño original) --- */}
      <div className="p-6 border-b border-slate-700/50 flex flex-col items-start gap-2">
          {/* Logo con filtro para que se vea blanco sobre fondo oscuro */}
          <img 
            src="/LOGO-NHS.png" 
            alt="Nexus Health Strategies" 
            className="h-10 w-auto object-contain brightness-0 invert filter"
          />
          
          <span className="text-[10px] text-slate-500 block tracking-[0.2em] uppercase mt-1 font-bold">
            {isAdmin ? 'Admin Workspace' : 'Client Portal'}
          </span>
      </div>

      {/* --- MENÚ DE NAVEGACIÓN --- */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto py-6">
         
         {/* DASHBOARD PRINCIPAL */}
         <div className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">
            General
         </div>
         <NavItem 
            href="/dashboard" 
            icon={<LayoutDashboard size={18} />} 
            label={isAdmin ? 'Panel de Control' : 'Mi Estrategia'} 
         />

         {/* --- SECCIÓN EXCLUSIVA DE ADMIN --- */}
         {isAdmin && (
           <>
             <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                Gestión
             </div>

             <NavItem 
                href="/dashboard/clientes" 
                icon={<Users size={18} />} 
                label="Clientes & Leads" 
             />

             {/* EL BOTÓN NUEVO */}
             <NavItem 
                href="/dashboard/usuarios" 
                icon={<Shield size={18} />} 
                label="Usuarios y Roles" 
             />
             
             {/* Calculadora Interna (si la tenías antes) */}
             <NavItem 
                href="/dashboard/calculadora-interna" 
                icon={<Calculator size={18} />} 
                label="Calculadora Costos" 
             />
           </>
         )}

         {/* --- SECCIÓN COMÚN --- */}
         <div className="pt-6 pb-2 px-4 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
            {isAdmin ? 'Recursos' : 'Su Expediente'}
         </div>

         <NavItem 
            href="/dashboard/docs" 
            icon={isAdmin ? <FileText size={18} /> : <ShieldCheck size={18}/>} 
            label={isAdmin ? 'Biblioteca Legal' : 'Registro Regulatorio'} 
         />

      </nav>

      {/* --- FOOTER (CONFIG & LOGOUT) --- */}
      <div className="p-4 border-t border-slate-700/50 bg-[#151923] space-y-1">
         <Link href="/user-profile" className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-white text-sm hover:bg-white/5 transition-all">
            <Settings size={18} />
            <span>Configuración</span>
         </Link>
         
         <SignOutButton>
            <button className="flex items-center gap-3 px-4 py-2 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all w-full text-left text-sm">
                <LogOut size={18} />
                <span>Cerrar Sesión</span>
            </button>
         </SignOutButton>
      </div>

    </div>
  );
}