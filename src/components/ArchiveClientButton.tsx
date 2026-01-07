"use client";
import { supabase } from "@/lib/supabase";
import { Archive, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ArchiveClientButton({ clientId, currentStatus }: { clientId: string, currentStatus: string }) {
  const router = useRouter();

  async function toggleStatus() {
    // Si es 'active', lo pasamos a 'archived'. Si es 'archived', lo devolvemos a 'active'.
    const newStatus = currentStatus === 'archived' ? 'active' : 'archived';
    const action = currentStatus === 'archived' ? 'Restaurar' : 'Archivar';
    
    if(!confirm(`¿Estás seguro de ${action} este cliente?`)) return;

    // Actualizamos en Supabase
    const { error } = await supabase.from('assessments').update({ status: newStatus }).eq('id', clientId);
    
    if (error) {
        alert("Error al actualizar: " + error.message);
    } else {
        router.refresh(); // Recargamos la página para ver el cambio
    }
  }

  // No mostramos este botón si es un Lead (prospecto), solo para Activos o Archivados
  if (!currentStatus || currentStatus === 'lead') return null;

  return (
    <button 
      onClick={toggleStatus}
      className={`p-2 rounded-lg transition-colors border ${
          currentStatus === 'archived' 
          ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100' 
          : 'bg-white text-slate-400 border-slate-200 hover:text-red-500 hover:bg-red-50'
      }`}
      title={currentStatus === 'archived' ? "Restaurar Cliente" : "Archivar Cliente"}
    >
      {currentStatus === 'archived' ? <RefreshCcw size={20} /> : <Archive size={20} />}
    </button>
  );
}