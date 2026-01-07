"use client";

import { UserButton, useUser } from "@clerk/nextjs";

export default function DashboardHeader() {
  const { user, isLoaded } = useUser();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0 shadow-sm z-10 relative">
       
       {/* Título de la Sección */}
       <div>
          <h2 className="text-lg font-bold text-slate-700">Panel de Gestión</h2>
       </div>

       {/* Área de Perfil (Nombre + Botón Clerk) */}
       <div className="flex items-center gap-4">
          {isLoaded && user && (
             <div className="text-right hidden md:block leading-tight">
                <p className="text-sm font-bold text-slate-800">{user.fullName}</p>
                <p className="text-[10px] text-slate-500">{user.primaryEmailAddress?.emailAddress}</p>
             </div>
          )}
          
          {/* El botón circular de Clerk (Tu foto) */}
          <div className="rounded-full border border-slate-200 p-0.5">
             <UserButton afterSignOutUrl="/" />
          </div>
       </div>
    </header>
  );
}