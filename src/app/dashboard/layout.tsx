import Sidebar from "@/components/Sidebar";
// IMPORTANTE: Importamos el header específico del dashboard, NO el de la landing
import DashboardHeader from "@/components/DashboardHeader"; 

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      
      {/* 1. SIDEBAR (Izquierda Fija - Oscuro) */}
      <Sidebar />
      
      {/* 2. COLUMNA DERECHA */}
      <div className="ml-64 flex-1 flex flex-col h-full w-full relative">
        
        {/* A. DASHBOARD HEADER (Barra blanca con tu usuario) */}
        <DashboardHeader />

        {/* B. CONTENIDO PRINCIPAL (Con scroll propio) */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
           <div className="p-8 pb-24"> 
              {children}
           </div>
        </main>

      </div>
    </div>
  );
}