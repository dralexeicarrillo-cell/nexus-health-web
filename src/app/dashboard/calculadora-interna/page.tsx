import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import InternalCalculator from "@/components/InternalCalculator"; 

export default async function CalculatorPage() {
  // 1. OBTENER USUARIO
  const user = await currentUser();
  
  // 2. VERIFICACIÓN DE ROL (Blindada)
  // Convertimos a minúsculas y quitamos espacios para evitar errores humanos en el ingreso del rol
  const metadata = user?.publicMetadata as any;
  const rawRole = metadata?.role || "";
  const role = String(rawRole).trim().toLowerCase();

  // 3. SEGURIDAD
  if (role !== 'admin') {
    redirect('/dashboard/docs');
  }

  // 4. RENDERIZADO (Solo Admin llega aquí)
  return (
    <div className="container mx-auto py-6">
       <InternalCalculator />
    </div>
  );
}