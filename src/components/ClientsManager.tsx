"use client";

import { useState } from "react";
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  Mail,
  ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";

// --- MOCK DATA (Simulando tu Base de Datos Supabase) ---
// En el futuro, esto vendrá de una tabla 'clients' que cruza datos con Clerk
const INITIAL_CLIENTS = [
  { 
    id: 1, 
    name: "Clínica Santa María", 
    contact: "Dr. Roberto Chang", 
    email: "direccion@santamaria.cr", 
    status: "En Proceso", 
    progress: 45, 
    phase: "Validación Documental",
    lastUpdate: "Hace 2 horas"
  },
  { 
    id: 2, 
    name: "MedTech Innovations SA", 
    contact: "Lic. Ana Solís", 
    email: "ana.solis@medtech.lat", 
    status: "Onboarding", 
    progress: 10, 
    phase: "Firma de Contrato",
    lastUpdate: "Ayer"
  },
  { 
    id: 3, 
    name: "Hospital Metropolitano (Expansión)", 
    contact: "Gerencia General", 
    email: "gerencia@metropolitano.com", 
    status: "Regulatorio", 
    progress: 75, 
    phase: "Esperando Aprobación MINSA",
    lastUpdate: "Hace 3 días"
  },
];

export default function ClientsManager() {
  const [clients, setClients] = useState(INITIAL_CLIENTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtro simple
  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Función para determinar color según estado
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Finalizado": return "bg-green-100 text-green-700 border-green-200";
      case "Regulatorio": return "bg-purple-100 text-purple-700 border-purple-200";
      case "En Proceso": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-orange-100 text-orange-700 border-orange-200"; // Onboarding
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">
            Cartera de Clientes
          </h1>
          <p className="text-slate-500 mt-1">
            Gestione el progreso, documentación y estado de sus proyectos activos.
          </p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#F7941D] text-white px-5 py-2.5 rounded-lg hover:bg-[#d47c12] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-medium"
        >
          <Plus size={18} />
          <span>Nuevo Cliente</span>
        </button>
      </div>

      {/* --- ESTADÍSTICAS RÁPIDAS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
         <StatCard label="Clientes Activos" value={clients.length.toString()} icon={<Users />} />
         <StatCard label="En Fase Regulatoria" value="1" icon={<AlertCircle />} />
         <StatCard label="Tasa de Finalización" value="92%" icon={<TrendingUp />} />
      </div>

      {/* --- BUSCADOR --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex items-center gap-3">
         <Search className="text-slate-400" size={20} />
         <input 
            type="text" 
            placeholder="Buscar por empresa, contacto o correo..." 
            className="flex-1 outline-none text-slate-700 bg-transparent"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
         />
      </div>

      {/* --- LISTA DE CLIENTES (CARDS) --- */}
      <div className="grid grid-cols-1 gap-4">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-[#F7941D]/50 hover:shadow-md transition-all relative overflow-hidden"
          >
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between z-10 relative">
               
               {/* Info Principal */}
               <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-lg">
                      {client.name.substring(0,2).toUpperCase()}
                  </div>
                  <div>
                      <h3 className="font-bold text-lg text-slate-800">{client.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-slate-500 mt-1">
                          <span className="flex items-center gap-1"><Users size={14}/> {client.contact}</span>
                          <span className="flex items-center gap-1"><Mail size={14}/> {client.email}</span>
                      </div>
                  </div>
               </div>

               {/* Progreso & Estado */}
               <div className="flex-1 w-full md:w-auto flex flex-col gap-2">
                   <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-slate-500">
                      <span>Fase Actual: {client.phase}</span>
                      <span>{client.progress}%</span>
                   </div>
                   <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#262262] rounded-full transition-all duration-1000"
                        style={{ width: `${client.progress}%` }}
                      ></div>
                   </div>
               </div>

               {/* Badge & Acción */}
               <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(client.status)}`}>
                      {client.status}
                   </span>
                   <button className="text-slate-400 hover:text-[#262262] p-2 hover:bg-slate-50 rounded-lg transition-colors">
                      <ArrowRight size={20} />
                   </button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MODAL SIMPLE (ADD CLIENT) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
              <h2 className="text-2xl font-serif font-bold mb-4 text-[#1A1F2C]">Vincular Nuevo Cliente</h2>
              <p className="text-sm text-slate-500 mb-6">
                Puede importar un usuario registrado o crear uno manualmente.
              </p>
              
              <div className="space-y-4">
                 <input type="text" placeholder="Nombre de la Empresa" className="w-full p-3 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-[#F7941D]" />
                 <input type="email" placeholder="Correo del Cliente (Clerk ID)" className="w-full p-3 border rounded-lg bg-slate-50 outline-none focus:ring-2 focus:ring-[#F7941D]" />
                 
                 <div className="pt-4 flex gap-3">
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 text-slate-600 font-medium hover:bg-slate-50 rounded-lg">Cancelar</button>
                    <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 bg-[#1A1F2C] text-white font-bold rounded-lg hover:bg-[#262262]">Guardar Cliente</button>
                 </div>
              </div>
           </div>
        </div>
      )}

    </div>
  );
}

// Componente pequeño para KPIs
function StatCard({ label, value, icon }: any) {
    return (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="p-3 bg-slate-50 text-[#262262] rounded-lg">
                {icon}
            </div>
            <div>
                <p className="text-sm text-slate-500 font-medium">{label}</p>
                <p className="text-2xl font-bold text-slate-800">{value}</p>
            </div>
        </div>
    )
}