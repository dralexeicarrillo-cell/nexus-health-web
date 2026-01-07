"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import { 
  Search, 
  Users, 
  TrendingUp, 
  Calendar, 
  Mail, 
  ArrowRight,
  Loader2,
  AlertCircle,
  CheckCircle2,
  Briefcase
} from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner"; // Si no tienes sonner, puedes usar alert() o instalarlo

interface ClientLead {
  id: string;
  created_at: string;
  company_name: string;
  company_email: string;
  contact_name: string;
  contact_position: string;
  total_score: number;
  status: string; // Nuevo campo
}

export default function ClientsBrowser() {
  const [clients, setClients] = useState<ClientLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<'active' | 'lead'>('active'); // Control de pestañas

  // --- 1. CARGA DE DATOS ---
  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assessments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setClients((data as any) || []);
    } catch (error: any) {
      console.error('Error cargando clientes:', error.message);
    } finally {
      setLoading(false);
    }
  }

  // --- 2. FUNCIÓN PARA ACTIVAR CLIENTE ---
  async function promoteToClient(id: string, currentName: string) {
    const confirm = window.confirm(`¿Deseas activar a "${currentName}" como cliente oficial?`);
    if (!confirm) return;

    try {
      const { error } = await supabase
        .from('assessments')
        .update({ status: 'active' }) // Cambiamos el estado
        .eq('id', id);

      if (error) throw error;
      
      // Actualizamos la lista localmente para ver el cambio inmediato
      setClients(prev => prev.map(c => c.id === id ? { ...c, status: 'active' } : c));
      alert("¡Cliente activado exitosamente!"); // O usa toast.success()
      
    } catch (error: any) {
      console.error("Error al activar:", error);
      alert("No se pudo activar el cliente");
    }
  }

  // --- 3. LÓGICA DE FILTRADO ---
  const filteredList = clients.filter(c => {
    // Primero filtramos por pestaña (status)
    // Si el campo status es null en DB, lo tratamos como 'lead'
    const currentStatus = c.status || 'lead';
    if (currentStatus !== activeTab) return false;

    // Luego por buscador
    const search = searchTerm.toLowerCase();
    return (
      (c.company_name || "").toLowerCase().includes(search) ||
      (c.company_email || "").toLowerCase().includes(search) ||
      (c.contact_name || "").toLowerCase().includes(search)
    );
  });

  // Helpers visuales
  const getScoreColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-blue-500";
    if (score >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">
            Gestión de Proyectos
          </h1>
          <p className="text-slate-500 mt-1">
            Administre sus clientes activos y revise nuevos prospectos.
          </p>
        </div>
        
        <button 
          onClick={fetchClients}
          className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all text-sm font-medium"
        >
           {loading ? <Loader2 size={16} className="animate-spin"/> : "🔄 Sincronizar"}
        </button>
      </div>

      {/* --- PESTAÑAS (TABS) --- */}
      <div className="flex gap-6 border-b border-slate-200">
        <button
            onClick={() => setActiveTab('active')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === 'active' 
                ? 'text-[#262262] border-[#F7941D]' 
                : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
        >
            <Briefcase size={18} />
            Clientes Activos
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                {clients.filter(c => (c.status === 'active')).length}
            </span>
        </button>

        <button
            onClick={() => setActiveTab('lead')}
            className={`pb-4 text-sm font-bold flex items-center gap-2 transition-all border-b-2 ${
                activeTab === 'lead' 
                ? 'text-[#262262] border-[#F7941D]' 
                : 'text-slate-400 border-transparent hover:text-slate-600'
            }`}
        >
            <Users size={18} />
            Prospectos (Leads)
            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                {clients.filter(c => (!c.status || c.status === 'lead')).length}
            </span>
        </button>
      </div>

      {/* --- BUSCADOR --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
         <Search className="text-slate-400" size={20} />
         <input 
            type="text" 
            placeholder={activeTab === 'active' ? "Buscar cliente activo..." : "Buscar lead..."}
            className="flex-1 outline-none text-slate-700 bg-transparent placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      {/* --- LISTA DE TARJETAS --- */}
      {loading ? (
         <div className="py-20 text-center text-slate-400 flex flex-col items-center gap-3">
            <Loader2 size={40} className="animate-spin text-[#F7941D]" />
            <p>Cargando datos...</p>
         </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredList.length > 0 ? (
            filteredList.map((client, index) => (
              <motion.div
                key={client.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`group bg-white rounded-xl p-6 border transition-all relative overflow-hidden ${
                    activeTab === 'active' 
                    ? 'border-l-4 border-l-green-500 border-y-slate-200 border-r-slate-200' 
                    : 'border-slate-200 hover:border-[#F7941D]/50'
                }`}
              >
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between z-10 relative">
                  
                  {/* Info */}
                  <div className="flex items-start gap-4 flex-1 min-w-[30%]">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${
                          activeTab === 'active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                      }`}>
                          {client.company_name ? client.company_name.substring(0,2).toUpperCase() : "??"}
                      </div>
                      <div>
                          <Link href={`/dashboard/clientes/${client.id}`} className="font-bold text-lg text-slate-800 hover:text-[#F7941D] transition-colors line-clamp-1">
                            {client.company_name || "Empresa Sin Nombre"}
                          </Link>
                          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-sm text-slate-500 mt-1">
                              <span className="flex items-center gap-1"><Users size={14}/> {client.contact_name || "Sin contacto"}</span>
                              <span className="flex items-center gap-1"><Mail size={14}/> {client.company_email}</span>
                          </div>
                      </div>
                  </div>

                  {/* Score */}
                  <div className="flex-1 w-full md:w-auto flex flex-col gap-2 min-w-[20%]">
                      <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                          <span>Score Inicial</span>
                          <span>{client.total_score}/100</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${getScoreColor(client.total_score)}`}
                            style={{ width: `${client.total_score}%` }}
                          ></div>
                      </div>
                  </div>

                  {/* ACCIONES (Diferentes según pestaña) */}
                  <div className="flex items-center justify-end w-full md:w-auto mt-4 md:mt-0 gap-3">
                      
                      {activeTab === 'lead' ? (
                        /* Botón para ACTIVAR (Solo en leads) */
                        <button 
                            onClick={() => promoteToClient(client.id, client.company_name)}
                            className="flex items-center gap-2 bg-[#1A1F2C] text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors shadow-sm text-sm font-bold"
                        >
                            <CheckCircle2 size={16} />
                            Activar Cliente
                        </button>
                      ) : (
                        /* Botón para GESTIONAR (Solo en activos) */
                        <Link 
                            href={`/dashboard/clientes/${client.id}`}
                            className="flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg hover:bg-[#F7941D] hover:text-white transition-colors text-sm font-medium"
                        >
                            <span>Gestionar</span>
                            <ArrowRight size={16} />
                        </Link>
                      )}

                  </div>
                </div>
              </motion.div>
            ))
          ) : (
             <div className="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
                <AlertCircle className="mx-auto h-10 w-10 text-slate-400 mb-3" />
                <p className="text-slate-500">
                    {activeTab === 'active' 
                        ? "No tienes clientes activos aún. Ve a 'Prospectos' para activar uno." 
                        : "No se encontraron leads con ese criterio."}
                </p>
             </div>
          )}
        </div>
      )}
    </div>
  );
}