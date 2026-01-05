import { FileText } from "lucide-react";

export default function DocsPage() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400">
      <FileText size={64} className="mb-4 opacity-20" />
      <h2 className="text-xl font-bold text-slate-600">Gestor Documental</h2>
      <p>Próximamente: Contratos y Propuestas.</p>
    </div>
  );
}