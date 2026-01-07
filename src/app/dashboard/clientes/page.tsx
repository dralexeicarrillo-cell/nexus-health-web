import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import ClientsBrowser from "@/components/ClientsBrowser"; // Importamos el componente visual

export default async function ClientesPage() {
  // 1. SEGURIDAD DE SERVIDOR (Admin Only)
  const user = await currentUser();
  
  // Normalización del rol (para evitar errores de tipeo o espacios)
  const metadata = user?.publicMetadata as any;
  const rawRole = metadata?.role || "";
  const role = String(rawRole).trim().toLowerCase();

  // Si no es admin, fuera
  if (role !== 'admin') {
    redirect('/dashboard/docs');
  }

  // 2. RENDERIZADO
  // Si pasa la seguridad, cargamos el navegador de clientes
  return (
    <div className="container mx-auto py-6">
       <ClientsBrowser />
    </div>
  );
}