"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { FileText, UploadCloud, Trash2, Download, File, Loader2 } from "lucide-react";

export default function ClientDossier({ clientId }: { clientId: string }) {
  const [docs, setDocs] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  // Cargar documentos al iniciar
  useEffect(() => {
    fetchDocs();
  }, []);

  async function fetchDocs() {
    const { data } = await supabase
      .from('client_documents')
      .select('*')
      .eq('client_id', clientId)
      .order('created_at', { ascending: false });
    if (data) setDocs(data);
  }

  // Subir archivo real a Supabase Storage
  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploading(true);
    const file = e.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${clientId}/${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    try {
      // 1. Subir al Storage
      const { error: uploadError } = await supabase.storage
        .from('client-docs')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 2. Obtener URL pública
      const { data: { publicUrl } } = supabase.storage
        .from('client-docs')
        .getPublicUrl(filePath);

      // 3. Guardar referencia en Base de Datos
      const { error: dbError } = await supabase
        .from('client_documents')
        .insert({
            client_id: clientId,
            name: file.name,
            url: publicUrl,
            type: fileExt,
            size: (file.size / 1024 / 1024).toFixed(2) + ' MB'
        });

      if (dbError) throw dbError;

      // Recargar lista
      fetchDocs();
      alert("Documento subido con éxito");

    } catch (error: any) {
      console.error(error);
      alert("Error al subir: " + error.message);
    } finally {
      setUploading(false);
    }
  }

  async function deleteDoc(id: string, url: string) {
      if(!confirm("¿Borrar este documento?")) return;
      await supabase.from('client_documents').delete().eq('id', id);
      fetchDocs();
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header del Expediente */}
      <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
         <div>
            <h3 className="font-bold text-slate-800 flex items-center gap-2">
               <FileText className="text-[#F7941D]" /> Expediente Digital
            </h3>
            <p className="text-xs text-slate-500">Documentación compartida del proyecto</p>
         </div>
         
         <label className={`cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold text-white transition-all ${uploading ? 'bg-slate-400' : 'bg-[#1A1F2C] hover:bg-[#262262]'}`}>
            {uploading ? <Loader2 className="animate-spin" size={16}/> : <UploadCloud size={16} />}
            {uploading ? "Subiendo..." : "Subir Archivo"}
            <input type="file" className="hidden" onChange={handleUpload} disabled={uploading} />
         </label>
      </div>

      {/* Lista de Archivos */}
      <div className="divide-y divide-slate-100">
         {docs.length === 0 ? (
            <div className="p-8 text-center text-slate-400 italic">
               Aún no hay documentos en este expediente.
            </div>
         ) : (
            docs.map((doc) => (
               <div key={doc.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                     <div className="bg-blue-50 text-blue-600 p-2 rounded-lg">
                        <File size={18} />
                     </div>
                     <div>
                        <p className="font-medium text-slate-700 text-sm">{doc.name}</p>
                        <p className="text-xs text-slate-400">{doc.created_at.substring(0,10)} • {doc.size}</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     <a href={doc.url} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Descargar">
                        <Download size={16} />
                     </a>
                     <button onClick={() => deleteDoc(doc.id, doc.url)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Eliminar">
                        <Trash2 size={16} />
                     </button>
                  </div>
               </div>
            ))
         )}
      </div>
    </div>
  );
}