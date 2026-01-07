"use client";

import { useState } from "react";
import { toggleUserRole } from "@/app/actions/users";
import { ShieldAlert, ShieldCheck, Loader2 } from "lucide-react";

export default function RoleToggleButton({ userId, currentRole, isMe }: { userId: string, currentRole: string, isMe: boolean }) {
  const [loading, setLoading] = useState(false);
  const isAdmin = currentRole === 'admin';

  async function handleToggle() {
    if (isMe) return alert("No puedes quitarte el permiso a ti mismo.");
    
    const action = isAdmin ? "quitar" : "otorgar";
    if (!confirm(`¿Estás seguro de ${action} permisos de Administrador a este usuario?`)) return;

    setLoading(true);
    const res = await toggleUserRole(userId, currentRole);
    setLoading(false);

    if (!res.success) {
        alert(res.message);
    }
  }

  if (isMe) return <span className="text-xs text-slate-400 italic">Tú</span>;

  return (
    <button 
      onClick={handleToggle}
      disabled={loading}
      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all flex items-center gap-2 ml-auto ${
        isAdmin 
        ? 'bg-white text-red-600 border-red-200 hover:bg-red-50' 
        : 'bg-[#1A1F2C] text-white border-transparent hover:bg-slate-800'
      }`}
    >
      {loading ? <Loader2 size={14} className="animate-spin"/> : (isAdmin ? <ShieldAlert size={14}/> : <ShieldCheck size={14}/>)}
      {isAdmin ? "Revocar Admin" : "Hacer Admin"}
    </button>
  );
}