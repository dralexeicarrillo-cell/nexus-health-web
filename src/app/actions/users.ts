"use server";

import { auth, clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

// Función para dar/quitar admin
export async function toggleUserRole(userId: string, currentRole: string) {
  // 1. Verificar que quien pide esto sea Admin (Seguridad)
  const { userId: adminId } = await auth();
  if (!adminId) return { success: false, message: "No autorizado" };

  const client = await clerkClient();
  
  // Verificamos que el solicitante sea admin real
  const adminUser = await client.users.getUser(adminId);
  const adminRole = adminUser.publicMetadata.role;

  if (adminRole !== 'admin') {
      return { success: false, message: "No tienes permisos de administrador." };
  }

  // 2. Definir nuevo rol
  const newRole = currentRole === 'admin' ? 'user' : 'admin';

  try {
    // 3. Actualizar en Clerk
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: newRole
      }
    });

    // 4. Recargar la página
    revalidatePath("/dashboard/usuarios");
    return { success: true, message: `Rol actualizado a ${newRole}` };

  } catch (error) {
    return { success: false, message: "Error al actualizar rol" };
  }
}