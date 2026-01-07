"use client";

import dynamic from "next/dynamic";
import { FileDown, Loader2 } from "lucide-react";
import ClientReportPDF from "./ClientReportPDF";

// Importamos PDFDownloadLink dinámicamente para evitar errores de servidor (SSR)
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <button className="bg-slate-100 text-slate-400 px-4 py-2 rounded-lg text-sm flex gap-2"><Loader2 className="animate-spin" size={16}/> Cargando PDF...</button>,
  }
);

export default function DownloadReportButton({ client }: { client: any }) {
  return (
    <PDFDownloadLink
      document={<ClientReportPDF client={client} />}
      fileName={`Reporte_NHS_${client.company_name.replace(/\s+/g, '_')}.pdf`}
    >
      {/* @ts-ignore - ReactPDF types fix */}
      {({ blob, url, loading, error }) => (
        <button 
            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all shadow-sm ${
                loading 
                ? 'bg-slate-100 text-slate-400 cursor-wait' 
                : 'bg-[#F7941D] text-white hover:bg-[#d47c12] hover:shadow-md hover:-translate-y-0.5'
            }`}
            disabled={loading}
        >
            {loading ? <Loader2 size={18} className="animate-spin"/> : <FileDown size={18} />}
            {loading ? 'Generando...' : 'Descargar Reporte PDF'}
        </button>
      )}
    </PDFDownloadLink>
  );
}