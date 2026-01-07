import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DocsVault from "@/components/DocsVault"; // Importamos la bóveda visual

export default async function DocsPage() {
  // 1. OBTENER USUARIO
  const user = await currentUser();
  
  if (!user) {
    redirect('/'); // Si no hay usuario, fuera.
  }

  // 2. VERIFICAR ROL
  const metadata = user.publicMetadata as any;
  const rawRole = metadata?.role || "";
  const role = String(rawRole).trim().toLowerCase();
  
  const isAdmin = role === 'admin';

  // Nota: Aquí NO redirigimos si no es admin, porque 
  // ¡esta página es para TODOS! (Clientes y Admins)
  
  // 3. RENDERIZAR
  return (
    <div className="container mx-auto py-6">
       {/* Pasamos el rol al componente para que sepa qué botones mostrar */}
       <DocsVault isAdmin={isAdmin} />
    </div>
  );
}