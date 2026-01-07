"use client";

import { useState } from "react";
import { 
  Search, 
  FileText, 
  Download, 
  Filter, 
  ShieldCheck, 
  UploadCloud, 
  MoreVertical,
  FileCheck,
  FileSpreadsheet
} from "lucide-react";
import { motion } from "framer-motion";

// --- DATOS DE EJEMPLO (MOCK DATA) ---
// En el futuro, esto vendrá de tu base de datos Supabase
const MOCK_DOCS = [
  { id: 1, title: "Licencia de Funcionamiento 2024", category: "Regulatorio", date: "15 Ene 2024", size: "2.4 MB", type: "pdf" },
  { id: 2, title: "Registro Sanitario - Dispositivo Class II", category: "Regulatorio", date: "10 Feb 2024", size: "4.1 MB", type: "pdf" },
  { id: 3, title: "Contrato de Servicios Consultoría", category: "Legal", date: "01 Mar 2024", size: "1.2 MB", type: "pdf" },
  { id: 4, title: "Auditoría de Compliance - Q1", category: "Legal", date: "20 Mar 2024", size: "8.5 MB", type: "pdf" },
  { id: 5, title: "Matriz de Riesgos Clínicos", category: "Técnico", date: "05 Abr 2024", size: "560 KB", type: "xlsx" },
  { id: 6, title: "Factura Electrónica #FE-9921", category: "Financiero", date: "30 Abr 2024", size: "120 KB", type: "pdf" },
];

export default function DocsVault({ isAdmin }: { isAdmin: boolean }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("Todos");

  // Filtrado de documentos
  const filteredDocs = MOCK_DOCS.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "Todos" || doc.category === activeTab;
    return matchesSearch && matchesTab;
  });

  const categories = ["Todos", "Regulatorio", "Legal", "Técnico", "Financiero"];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      
      {/* --- ENCABEZADO --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-slate-800">
            {isAdmin ? 'Gestión Documental Global' : 'Su Expediente Regulatorio'}
          </h1>
          <p className="text-slate-500 mt-1">
            {isAdmin 
              ? 'Administre los documentos visibles para sus clientes.' 
              : 'Acceda a sus licencias, registros y contratos vigentes.'}
          </p>
        </div>
        
        {isAdmin && (
          <button className="flex items-center gap-2 bg-[#1A1F2C] text-white px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
            <UploadCloud size={18} />
            <span>Subir Documento</span>
          </button>
        )}
      </div>

      {/* --- BARRA DE HERRAMIENTAS --- */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
        
        {/* Pestañas de Categoría */}
        <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === cat 
                  ? 'bg-[#F7941D]/10 text-[#d47c12]' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Buscador */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text"
            placeholder="Buscar documento..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1A1F2C]/20 text-sm"
          />
        </div>
      </div>

      {/* --- GRID DE DOCUMENTOS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocs.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg hover:border-[#F7941D]/30 transition-all cursor-pointer relative overflow-hidden"
          >
            {/* Decoración Hover */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#F7941D]/5 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>

            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${doc.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-green-50 text-green-600'}`}>
                {doc.type === 'pdf' ? <FileText size={24} /> : <FileSpreadsheet size={24} />}
              </div>
              <button className="text-slate-300 hover:text-slate-600">
                <MoreVertical size={18} />
              </button>
            </div>

            <h3 className="font-bold text-slate-800 mb-1 line-clamp-1" title={doc.title}>
              {doc.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-6">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-500">
                {doc.category}
              </span>
              <span className="text-xs text-slate-400">• {doc.size}</span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-400">{doc.date}</span>
              
              <button className="flex items-center gap-1.5 text-xs font-bold text-[#1A1F2C] hover:text-[#F7941D] transition-colors">
                <Download size={14} />
                Descargar
              </button>
            </div>
          </motion.div>
        ))}

        {/* Estado Vacío */}
        {filteredDocs.length === 0 && (
          <div className="col-span-full py-20 text-center text-slate-400">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter size={32} />
            </div>
            <p className="text-lg font-medium text-slate-600">No se encontraron documentos</p>
            <p className="text-sm">Intenta ajustar tu búsqueda o filtros.</p>
          </div>
        )}
      </div>

    </div>
  );
}